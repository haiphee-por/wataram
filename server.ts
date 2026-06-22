import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Pre-seeded temples, matching initial data structure
let temples = [
  {
    id: 'wat-phra-kaew',
    name: 'Wat Phra Kaew (วัดพระแก้ว)',
    englishName: 'Wat Phra Kaew',
    tagline: 'Temple of the Emerald Buddha, the most sacred site in Thailand.',
    description: 'Temple of the Emerald Buddha, located inside the Grand Palace complex, is the most sacred Buddhist temple in Thailand. It houses the meticulously carved statue of the Emerald Buddha, meditating in the historical style of the Lanna school.',
    thaiDescription: 'วัดพระศรีรัตนศาสดาราม หรือที่เรียกกันทั่วไปว่า วัดพระแก้ว เป็นพระอารามหลวงตั้งอยู่ในเขตพระบรมมหาราชวัง เป็นที่ประดิษฐานพระพุทธมหามณีรัตนปฏิมากร (พระแก้วมรกต) ซึ่งเป็นพระพุทธรูปคู่บ้านคู่เมืองของไทยที่มีศิลปะล้ำค่า',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcs3RuWvCgvApVR6P4FknU7xONHnHxlTUQuCc-Ke8He2kRU70566fUDixVrhdQLFp7AflF-K4zzIlNoR9AinQw3DEr1G04XcuoeeWJVXagvgh5845dwbz3Q1SWafYtOcuq5v79XMy08HUcHX1RCKBbBH0LGoNWElXEBq7p64mC0pMaecPFYkM1qbuDheR-HmTHDlbCx5e4gzYmi37mssIMSRanHSZmqHPt2cZOeejesbCmUERossQrDHuqe0MHf0FkRhiU6XLGbCfC',
    province: 'กรุงเทพมหานคร',
    district: 'พระนคร',
    type: 'พระอารามหลวง',
    rating: 4.9,
    reviewsCount: 3822,
    distance: '1.2 กม.',
    yearBuilt: '1782 (Rattanakosin Era)',
    architecturalStyle: 'Traditional Rattanakosin',
    locationName: 'Phra Nakhon, Bangkok',
    visitingHours: '08:30 - 15:30 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcs3RuWvCgvApVR6P4FknU7xONHnHxlTUQuCc-Ke8He2kRU70566fUDixVrhdQLFp7AflF-K4zzIlNoR9AinQw3DEr1G04XcuoeeWJVXagvgh5845dwbz3Q1SWafYtOcuq5v79XMy08HUcHX1RCKBbBH0LGoNWElXEBq7p64mC0pMaecPFYkM1qbuDheR-HmTHDlbCx5e4gzYmi37mssIMSRanHSZmqHPt2cZOeejesbCmUERossQrDHuqe0MHf0FkRhiU6XLGbCfC'
    ],
    verified: true
  },
  {
    id: 'wat-arun',
    name: 'Wat Arun (วัดอรุณราชวราราม)',
    englishName: 'Wat Arun Ratchawararam',
    tagline: 'The Temple of Dawn on the west bank of Chao Phraya River.',
    description: 'Wat Arun is one of the most stunning temples in Bangkok, not only because of its riverside location but also because the design is very different to the other temples you can visit in Bangkok. Wat Arun is partly made up of colorfully decorated spires and stands majestically over the water.',
    thaiDescription: 'วัดอรุณราชวราราม เป็นพระอารามหลวงชั้นเอก ชนิดราชวรมหาวิหาร ตั้งอยู่ทางทิศตะวันตกของแม่น้ำเจ้าพระยา เป็นโบราณสถานที่โดดเด่นและเป็นสัญลักษณ์สำคัญของกรุงเทพมหานคร พระปรางค์วัดอรุณฯ จัดเป็นพระปรางค์ที่สูงที่สุดในประเทศไทย มีความสูงประมาณ ๘๑ เมตร ประดับด้วยชิ้นเครื่องเบญจรงค์และเปลือกหอย',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3w6KMjXxaqeaYyB8Ks1pWzB45ZQO-ZhTEdt9EXvzRmdyLJvTpX2tK7QWB3apXze3IC3InvXX1QT2SJUldFEKNRz2L1CTVujiUBMvh9JJqGJgY4fKo8c31FGjFJWbLHQnNGLp0ZQpuuGKvhZlQjZ_u16N6JDzrhyiBXuVQ-7wd27Dh3Gg4nRsIcn2l2eZiYSY2qlQcPEEhA3-04EWzTDc0FSMVABX008NdFrRcfq2cIW34DKfEiJ7k04NJ8y5R1idftKt97sKYp1r8',
    province: 'กรุงเทพมหานคร',
    district: 'บางกอกใหญ่',
    type: 'พระอารามหลวง',
    rating: 4.8,
    reviewsCount: 2453,
    distance: '4.2 กม.',
    yearBuilt: '17th Century (Ayutthaya Era)',
    architecturalStyle: 'Chakri Dynasty (Renovated)',
    locationName: 'Thonburi, Bangkok',
    visitingHours: '08:00 - 18:00 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAW5-nI5OXJbQAR2--sRyF11BUdAOP0FysLLPWQ9ByVQEXqQMFj3s0d6VCCAzg8krcRZJJJGpQnOFqBl1OaU_uNOLMhC-CTxDpjctxhQjS2W_3b9Xx8-LJLGOWR4CPwHh50lyIf1oBtr7CWT9WkZrLrOFeBQqahIQqgtNzfnEavB4dpZtgqD4BLiPkXZksk2T4X0_kGaTC0Qh3bpLdWoJ2BqFMXU6UJSdMIQV3tqGyVXB4Y-T2e91fzzI_KgVtPqhmiuBOj4C-PsjDR',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwyg0tHmLjmYjTtmdAgZc_EYVEhNhKOqgUL7A44XcT5pPOwG9m9IrhdKPkdhgqnwOjDTvEcolLZqn2QSS6bOrFJdCmgOmI2SSF06BXCys3GTAG_oR6BC3MeDm0LKzd8ahvQLUf3H75txsR7u4NU7tS44VHU9kC_m4vjpYaIg-Bp9JIV6DzQtxy6hIKKpjXquTuuZKn4wAaZHTJZ9ViiAENQkcje49Ub34qMSWVn2pBqhA_w4vJXC8AmMas7w8ggcR6_zsDLLyszBxJ'
    ],
    verified: true
  },
  {
    id: 'wat-pho',
    name: 'Wat Pho (วัดโพธิ์)',
    englishName: 'Wat Phra Chetuphon Wimon Mangkhalaram',
    tagline: 'Home of the magnificent 46-meter Reclining Buddha.',
    description: 'Wat Pho is a first-class royal temple, famously known for housing the giant gold Reclining Buddha. The complex also serves as a leading school of traditional massage and Thai herbal medicine.',
    thaiDescription: 'วัดพระเชตุพนวิมลมังคลาราม หรือที่รู้จักกันดีในชื่อ วัดโพธิ์ เป็นพระอารามหลวงชั้นเอก โดดเด่นด้วยพระพุทธไสยาสน์องค์ใหญ่ที่มีความยาวถึง ๔๖ เมตร และได้รับการขึ้นทะเบียนเป็นมรดกความทรงจำแห่งโลกในระดับภูมิภาคเอเชียแปซิฟิกสำหรับการนวดแผนไทยโบราณ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4DU9rwAKxiDqrz7R9nZvgbWkRiJmoDEIoorKh-E2y1qesWPWMKFiGSCdJ70QcSaJNkWOGjsgudCDjjWC8-qKKTwpTBSC-Pxqb0Wnw7d_5CY-j4NG954Yqd_FNwWLlCPZF7KU8NFB97ZcXH4WKYpbHasy61B8Cm9Df1_TxR2r3QXjpA8P8_lw1aw5WTsmiXFGwrPZzbHN2zQ_p7BwSgcgKJqOycixFd115nDR3Xc86ivTh4J--rh4Cnj1_QCqffEpVJ3B-8tmXvqL1',
    province: 'กรุงเทพมหานคร',
    district: 'พระนคร',
    type: 'พระอารามหลวง',
    rating: 4.9,
    reviewsCount: 3105,
    distance: '3.1 กม.',
    yearBuilt: '16th Century (Ayutthaya Era)',
    architecturalStyle: 'Late Ayutthaya / Early Rattanakosin',
    locationName: 'Phra Nakhon, Bangkok',
    visitingHours: '08:00 - 18:30 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWFn095p4SWBoNjsR3GhXc8jZtkLa9XmEiIYVD-0W0ctX8TabBVYRz81nY7xXyqEGl58CNdQ7XKdN4Kis1qASkR9_p1JG11Zjc1GKGUte7eCrJn0q-_JH7HHGh_qnD6KvUlU3rqwJz1OZLXXbiBcqdmMywIF56cQuZHz1peIHZzUcVnoaAnKMUUUyAxQF0vcUP9nkixkzCcTHarB7RaeXob97xHBbDnhQZmaWrVEj2bmXlUJoYpY58py1knyXuElo4DBGMZyB7WqrF'
    ],
    verified: true
  },
  {
    id: 'wat-saket',
    name: 'Wat Saket (Golden Mount)',
    englishName: 'Wat Saket Ratchaworamahawihan',
    tagline: 'Distinctive golden chedi rising above the heart of Bangkok.',
    description: 'Wat Saket is classified as an ancient temple built during the Ayutthaya period. Its prominent feature is the Golden Mount, a steep artificial hill crowned with a magnificent golden chedi containing sacred relics.',
    thaiDescription: 'วัดสระเกศราชวรมหาวิหาร หรือ วัดภูเขาทอง โดดเด่นด้วยเจดีย์สีทองอร่ามบนเนินเขาใจกลางกรุงเทพฯ เป็นพระอารามหลวงโบราณที่สร้างขึ้นตั้งแต่สมัยกรุงศรีอยุธยา มีทัศนียภาพที่สวยงามมองเห็นวิวเมืองหลวงได้อย่างพาโนรามา',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmOP2D0IUOJFwFOEqGVzTs0PAiooY1h7bsMIuJCkHsIhvfM2ZVxXK4GWXhR7LkVd8djfwBW9qx-oYAGlSD5SDvm2_ZHAhaidBFIgSLEhXx692G5pLO15G5LLdfffjHTCaPr8JZ84W67BXZXFUyuVGnjj6nb-OasKewL2sue92vmobhq7bu4ruf1kOkaWTXcLcvFhBVTXajA0h8JAru7SGL41xj27BxyWWfyiJoOLmRCbjohV91HiyX_T-jU0YCcGuM4iyuzfW463l4',
    province: 'กรุงเทพมหานคร',
    district: 'ป้อมปราบศัตรูพ่าย',
    type: 'พระอารามหลวง',
    rating: 4.8,
    reviewsCount: 1982,
    distance: '2.4 กม.',
    yearBuilt: 'Ayutthaya Era',
    architecturalStyle: 'Late Ayutthaya / Early Bangkok',
    locationName: 'Pom Prap Sattru Phai, Bangkok',
    visitingHours: '07:30 - 19:00 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmOP2D0IUOJFwFOEqGVzTs0PAiooY1h7bsMIuJCkHsIhvfM2ZVxXK4GWXhR7LkVd8djfwBW9qx-oYAGlSD5SDvm2_ZHAhaidBFIgSLEhXx692G5pLO15G5LLdfffjHTCaPr8JZ84W67BXZXFUyuVGnjj6nb-OasKewL2sue92vmobhq7bu4ruf1kOkaWTXcLcvFhBVTXajA0h8JAru7SGL41xj27BxyWWfyiJoOLmRCbjohV91HiyX_T-jU0YCcGuM4iyuzfW463l4'
    ],
    verified: true
  },
  {
    id: 'wat-benchamabophit',
    name: 'Wat Benchamabophit',
    englishName: 'The Marble Temple',
    tagline: 'Spectacular temple crafted with fine Italian marble.',
    description: 'Wat Benchamabophit Dusitwanaram is a magnificent Buddhist temple in the Dusit district of Bangkok. Also known as the Marble Temple, it is constructed of white Carrara marble imported from Italy, blending Thai design with European motifs.',
    thaiDescription: 'วัดเบญจมบพิตรดุสิตวนาราม รู้จักกันในนาม "วัดหินอ่อน" งดงามด้วยสถาปัตยกรรมไทยผสมผสานยุโรป ตัวอุโบสถสร้างด้วยหินอ่อนคาร์ราราที่ดีที่สุดจากประเทศอิตาลี มีลักษณะสัดส่วนและรายละเอียดที่สง่างามวิจิตรบรรจง',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrM73bqnUN_ceEN6a4XQpFd7d3DJey7u7Mu7hWWjisr0k1apXQBATjdEU4qyTRPQUvXpSOxG2LVgwxzRY-TRhRiVu1cB-DplOk-P2vJAhEZxuyHpBwW_EnqAsemP2JH8vSfsDHFlbxU-mqID-6zGeir-4LyM_HZY90HKHMX1-p1UJgULR48iO1gtGYOsqEsTUguGpGbYSSO_RpScQ7AbZRa8xN95bdfMyb6WggAbgQ__dj1Hr1csLFqLAc1u66oyp3uUkqwwCum84g',
    province: 'กรุงเทพมหานคร',
    district: 'ดุสิต',
    type: 'พระอารามหลวง',
    rating: 4.9,
    reviewsCount: 1654,
    distance: '1.8 กม.',
    yearBuilt: '1899 (King Rama V)',
    architecturalStyle: 'Neoclassical Thai Fusion',
    locationName: 'Dusit, Bangkok',
    visitingHours: '08:00 - 17:30 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrM73bqnUN_ceEN6a4XQpFd7d3DJey7u7Mu7hWWjisr0k1apXQBATjdEU4qyTRPQUvXpSOxG2LVgwxzRY-TRhRiVu1cB-DplOk-P2vJAhEZxuyHpBwW_EnqAsemP2JH8vSfsDHFlbxU-mqID-6zGeir-4LyM_HZY90HKHMX1-p1UJgULR48iO1gtGYOsqEsTUguGpGbYSSO_RpScQ7AbZRa8xN95bdfMyb6WggAbgQ__dj1Hr1csLFqLAc1u66oyp3uUkqwwCum84g'
    ],
    verified: true
  },
  {
    id: 'wat-pho-chai',
    name: 'Wat Pho Chai (วัดโพธิ์ชัย)',
    englishName: 'Wat Pho Chai',
    tagline: 'Luminous sanctuary hosting the legendary Luang Pho Phra Sai.',
    description: 'Wat Pho Chai is highly revered, situated in Nong Khai. It houses Luang Pho Phra Sai, a sacred golden Buddha image rumored to have been cast in the Lan Xang kingdom and miraculously delivered across the Mekong river.',
    thaiDescription: 'วัดโพธิ์ชัย เป็นพระอารามหลวงตั้งอยู่ในอำเภอเมืองหนองคาย จังหวัดหนองคาย เป็นที่ประดิษฐานหลวงพ่อพระใส พระพุทธรูปขัดสมาธิราบปางมารวิชัย หล่อด้วยทองสีสุก ซึ่งเป็นที่เคารพสักการะอย่างมากของชาวอีสานและสปป.ลาว',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl2L5_AEBCyNmBRdsD1ctsmoPOoFmP5Zr-oFl06sRNSZCszldCmtty7wlbhLLK6OB60HSq2Fk3KzRwTaHuiSg7V2UWVuV8Ia3yEgjBmAw6cgu8zSphaqTmU3NceKO7s92Rs1D0F-1u7c-qB6oW-Bo5AiviuOXjWP-5jqrJRT29jdESDbFH627tqjiP2cMDMA6o9GVW2yr0OcaxS2Imn5_hZY5VsshWUxhhbXhxKVQ57SHIWGihfWpvOamlYsIQK0o8hOuBQmQ1SwxF',
    province: 'หนองคาย',
    district: 'เมืองหนองคาย',
    type: 'พระอารามหลวง',
    rating: 4.8,
    reviewsCount: 750,
    distance: '3.5 กม.',
    yearBuilt: 'Early Lan Xang / Rattanakosin',
    architecturalStyle: 'Lan Xang & Rattanakosin Fusion',
    locationName: 'Nong Khai, Thailand',
    visitingHours: '08:00 - 17:00 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAl2L5_AEBCyNmBRdsD1ctsmoPOoFmP5Zr-oFl06sRNSZCszldCmtty7wlbhLLK6OB60HSq2Fk3KzRwTaHuiSg7V2UWVuV8Ia3yEgjBmAw6cgu8zSphaqTmU3NceKO7s92Rs1D0F-1u7c-qB6oW-Bo5AiviuOXjWP-5jqrJRT29jdESDbFH627tqjiP2cMDMA6o9GVW2yr0OcaxS2Imn5_hZY5VsshWUxhhbXhxKVQ57SHIWGihfWpvOamlYsIQK0o8hOuBQmQ1SwxF'
    ],
    verified: false,
    heritageClass: 'Heritage Class A'
  },
  {
    id: 'wat-chiang-man',
    name: 'Wat Chiang Man (วัดเชียงมั่น)',
    englishName: 'Wat Chiang Man',
    tagline: 'The oldest royal temple founded by King Mengrai in Chiang Mai.',
    description: 'Wat Chiang Man is a Buddhist temple inside the old city of Chiang Mai. Founded in 1296 by King Mengrai, the temple contains rare crystalline Buddha images and is famous for its Elephant Chedi.',
    thaiDescription: 'วัดเชียงมั่น เป็นวัดที่เก่าแก่ที่สุดในตัวเมืองเชียงใหม่ สร้างขึ้นเมื่อปี พ.ศ. 1839 โดยพญามังราย มหาราชผู้ทรงสถาปนาเมืองเชียงใหม่ ตัววิหารประดับด้วยปูนปั้นลวดลายล้านนาวิจิตรบรรจง และมีพระเจดีย์ช้างล้อมที่สง่างาม',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkILRz9ddrwyOGYm7OEAXWGp8xJsDJZGYx_HJTWzBYMM9oFOR4h-1I9YwGV-dnJjuY2qU5xq4VnNV6ZggD6bERUN0Tl7dvTkdeCJNsF0QzR_dlkwxvm3WTFJ9JCH4WNjxCo3XeUGYAQhhdOa16QE_yiGPHqALPKa0yZDqEB8EdiJCpsstB6knom6hzrqnwTrXdkM7iTg5jsHeJeSW50FTTYS8qkYZ2ekpI8hRNVj36INlWzm9ALJNJGt-HXZpHYfQV8PewZ5hExAtk',
    province: 'เชียงใหม่',
    district: 'เมืองเชียงใหม่',
    type: 'พระอารามหลวง',
    rating: 4.7,
    reviewsCount: 890,
    distance: '5.0 กม.',
    yearBuilt: '1296 (พ.ศ. 1839)',
    architecturalStyle: 'Classical Lanna Style',
    locationName: 'Chiang Mai, Thailand',
    visitingHours: '06:00 - 18:00 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkILRz9ddrwyOGYm7OEAXWGp8xJsDJZGYx_HJTWzBYMM9oFOR4h-1I9YwGV-dnJjuY2qU5xq4VnNV6ZggD6bERUN0Tl7dvTkdeCJNsF0QzR_dlkwxvm3WTFJ9JCH4WNjxCo3XeUGYAQhhdOa16QE_yiGPHqALPKa0yZDqEB8EdiJCpsstB6knom6hzrqnwTrXdkM7iTg5jsHeJeSW50FTTYS8qkYZ2ekpI8hRNVj36INlWzm9ALJNJGt-HXZpHYfQV8PewZ5hExAtk'
    ],
    verified: false,
    heritageClass: 'Historical Site'
  },
  {
    id: 'wat-pa-huay-lad',
    name: 'Wat Pa Huay Lad (วัดป่าห้วยลาด)',
    englishName: 'Wat Pa Huay Lad',
    tagline: 'A spectacular, serene forest temple framed by Loei mountain mist.',
    description: 'Wat Pa Huay Lad is situated amidst deep mountains in Loei. Known for its expansive compound and beautiful integration of architecture with the natural forest environment, it serves as a peaceful meditation center.',
    thaiDescription: 'วัดป่าห้วยลาด ตั้งอยู่ในอำเภอภูเรือ จังหวัดเลย แวดล้อมด้วยทิวเขาอันสลับซับซ้อนและสายหมอกยามเช้า มีองค์พระประธานขนาดใหญ่งดงามตระการตา และสถาปัตยกรรมที่เปิดกว้างรับทัศนียภาพธรรมชาติที่งดงามยิ่ง',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmJSc6QBaUD5KuJVpZBGi0bBj8PkyybD9k41PaHTEPLxxYvGgVWY4Po_Puqpu52uP2Ga-f_XYRLZUSkH8FgD3QVOoDWFnMF0aRuI2LGx9bm9cbVKzso86_E0ea8jLFjS4-LKEXTQ516NQzP36cjYvT_7WeOc9abFLYOUT5-X8m6CQ8c_pFfZnDSPVFxRmx0i2elX2IsVK8mCY-qgnbMBk_F1aCzPLbju5PuMauYXQk5BIXyBKUpxSxnF6QmPdAuog7uNpU3KQSBJcu',
    province: 'เลย',
    district: 'ภูเรือ',
    type: 'วัดราษฎร์',
    rating: 4.8,
    reviewsCount: 420,
    distance: '12.0 กม.',
    yearBuilt: 'Late 20th Century',
    architecturalStyle: 'Modern Forest Temple Art',
    locationName: 'Loei, Thailand',
    visitingHours: '07:00 - 18:00 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDmJSc6QBaUD5KuJVpZBGi0bBj8PkyybD9k41PaHTEPLxxYvGgVWY4Po_Puqpu52uP2Ga-f_XYRLZUSkH8FgD3QVOoDWFnMF0aRuI2LGx9bm9cbVKzso86_E0ea8jLFjS4-LKEXTQ516NQzP36cjYvT_7WeOc9abFLYOUT5-X8m6CQ8c_pFfZnDSPVFxRmx0i2elX2IsVK8mCY-qgnbMBk_F1aCzPLbju5PuMauYXQk5BIXyBKUpxSxnF6QmPdAuog7uNpU3KQSBJcu'
    ],
    verified: false,
    heritageClass: 'Community Temple'
  }
];

// Seeded reviews matching user requirements
let reviews = [
  {
    id: 'r1',
    templeId: 'wat-arun',
    author: 'Ananya S.',
    avatarChar: 'A',
    rating: 5,
    date: '2 days ago',
    comment: 'The sunset view here is unparalleled. Even with the crowds, there\'s a profound sense of peace. The detail in the ceramics is mind-blowing.'
  },
  {
    id: 'r2',
    templeId: 'wat-arun',
    author: 'Michael Chen',
    avatarChar: 'M',
    rating: 5,
    date: '1 week ago',
    comment: 'Magnificent architecture. Climbing the stairs was a challenge but the view from the top is worth every step. Essential visit in Thonburi.'
  },
  {
    id: 'r3',
    templeId: 'wat-phra-kaew',
    author: 'Kittirat P.',
    avatarChar: 'K',
    rating: 5,
    date: '3 days ago',
    comment: 'Incredibly beautiful and detailed. The Emerald Buddha has beautiful outfits changed seasonally.'
  }
];

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json());

  // API endpoint: Get all temples
  app.get("/api/temples", (req, res) => {
    res.json(temples);
  });

  // API endpoint: Propose/Register a Temple
  app.post("/api/temples", (req, res) => {
    const { name, englishName, tagline, description, thaiDescription, image, province, district, type, yearBuilt, architecturalStyle, locationName, visitingHours } = req.body;
    
    if (!name || !province || !image) {
      return res.status(400).json({ error: "Name, Province and Header Image are required" });
    }

    const newTemple = {
      id: `custom-${Date.now()}`,
      name,
      englishName: englishName || name,
      tagline: tagline || "A registered sanctuary of Thai cultural architecture.",
      description: description || "Proposed temple sanctuary on SiamSanctuary directory.",
      thaiDescription: thaiDescription || description || "โบราณสถานและพระอารามที่ลงทะเบียนนำเสนอ",
      image,
      province,
      district: district || "",
      type: type || "วัดราษฎร์",
      rating: 4.5,
      reviewsCount: 1,
      distance: "Local",
      yearBuilt: yearBuilt || "Modern Era",
      architecturalStyle: architecturalStyle || "Traditional Thai",
      locationName: locationName || `${province}, Thailand`,
      visitingHours: visitingHours || "08:00 - 17:00 Daily",
      images: [image],
      verified: false
    };

    temples.unshift(newTemple);
    res.status(201).json(newTemple);
  });

  // API endpoint: Update temple status (Verification, Details)
  app.put("/api/temples/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    const index = temples.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Temple not found" });
    }

    temples[index] = {
      ...temples[index],
      ...updates
    };

    res.json(temples[index]);
  });

  // API endpoint: Get reviews for a temple
  app.get("/api/reviews/:templeId", (req, res) => {
    const { templeId } = req.params;
    const filtered = reviews.filter(r => r.templeId === templeId);
    res.json(filtered);
  });

  // API endpoint: Add a review for a temple
  app.post("/api/reviews", (req, res) => {
    const { templeId, author, rating, comment } = req.body;
    if (!templeId || !author || !rating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      templeId,
      author,
      avatarChar: author.charAt(0).toUpperCase() || "S",
      rating: Number(rating),
      date: "Just now",
      comment
    };

    reviews.unshift(newReview);

    // Update temple rating and response counts
    const index = temples.findIndex(t => t.id === templeId);
    if (index !== -1) {
      const existingReviews = reviews.filter(r => r.templeId === templeId);
      const avgRating = existingReviews.reduce((sum, r) => sum + r.rating, 0) / existingReviews.length;
      temples[index].rating = avgRating;
      temples[index].reviewsCount = existingReviews.length;
    }

    res.status(201).json(newReview);
  });

  // API endpoint: Siam AI Advisor chat (incorporating Gemini SDK)
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const ai = getGeminiClient();
      if (!ai) {
        // Fallback advisor responses if API Key is not set or not injected
        const text = message.toLowerCase();
        let fallbackReply = `Sawadee Khab! I am Phra Sila, your cultural heritage assistant. Currently, my advanced Gemini neural link is in local-fallback mode, but I can guide you based on deep-seeded knowledge of Thai heritage:\n\n`;
        
        if (text.includes("dress") || text.includes("wear") || text.includes("code")) {
          fallbackReply += `• **Temple Dress Code:** Respectful attire is strictly required when visiting holy ground. Please wear clothing that covers your shoulders and knees. Avoid sleeveless shirts, shorts, or tight-fitting garments. You must remove your shoes before entering any main sanctuary (Ubosot) building.`;
        } else if (text.includes("emerald") || text.includes("phra kaew")) {
          fallbackReply += `• **Wat Phra Kaew:** The Emerald Buddha is Thailand's most revered image. It is carved from a single block of jade (not emerald) and adorned in three distinct golden seasonal uniforms (Summer, Rainy, and Winter) changed personally by His Majesty the King.`;
        } else if (text.includes("dawn") || text.includes("arun")) {
          fallbackReply += `• **Wat Arun (Temple of Dawn):** Best viewed at sunset or dawn, its iconic central prang is 81 meters high and is meticulously encrusted with millions of pieces of colorful Chinese porcelain and seashells left by trading ships.`;
        } else if (text.includes("lanna") || text.includes("chiang mai")) {
          fallbackReply += `• **Lanna Architecture:** Characteristic of Northern Thailand, featuring multilayered low sweeping roofs, gorgeous wood carvings, and beautiful elephant-encircled pagodas, as seen in Chiang Mai's historic Wat Chiang Man.`;
        } else {
          fallbackReply += `I recommend visiting **Wat Phra Kaew** to experience royal Rattanakosin elegance, **Wat Arun** for Khmer-inspired architectural masterpieces, or checking out pending community temples like **Wat Pho Chai** in Nong Khai representing glorious Lan Xang folk art. What would you like to know about Thai temple rules or architecture?`;
        }
        return res.json({ reply: fallbackReply });
      }

      // Prepare system context instruction on Thailand temples
      const systemInstruction = `You are "Phra Sila" (พระศิลา), an elegant and highly scholarly AI Cultural Heritage Advisor for SiamSanctuary.
You specialize in Thailand's majestic temples, historical regions, traditional Lanna, Ayutthaya, Sukhothai, and Rattanakosin architectural styles, and appropriate etiquette rules.
Keep your tone serene, graceful, and deeply respectful. Communicate in a blend of English and Thai where useful to capture authentic titles (e.g., using "Sawatdee khab", "Ubosot", "Chedi").
Suggest specific temples from SiamSanctuary like Wat Phra Kaew, Wat Arun, Wat Pho, or Wat Pho Chai of Nong Khai.
Always encourage cultural preservation. Keep responses concise but highly informative, ideally around 2 or 3 short paragraphs.`;

      // Call Gemini API using modern GoogleGenAI SDK format
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...(history || []).map((h: any) => ({
            role: h.role,
            parts: [{ text: h.content }]
          })),
          { role: "user", parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      const replyText = response.text || "I was unable to formulate context. Please ask again.";
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Gemini Advisor Error:", err);
      // Graceful error recovery returning valid fallback output
      res.json({
        reply: `Sawadee khab! I encountered a transient network connection event with my server. However, let me guide you: please feel free to explore our verified treasures like the spectacular Carrara marble walls of Wat Benchamabophit or Wat Arun\'s towering spires.`
      });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SiamSanctuary Server active on http://localhost:${PORT}`);
  });
}

startServer();
