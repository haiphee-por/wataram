import { Temple, Review, Activity } from './types';

export const initialTemples: Temple[] = [
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
    reviewsCount: 3820,
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
    reviewsCount: 2450,
    distance: '4.2 กม.',
    yearBuilt: '17th Century (Ayutthaya Era)',
    architecturalStyle: 'Chakri Dynasty (Renovated)',
    locationName: 'Thonburi, Bangkok',
    visitingHours: '08:00 - 18:00 Daily',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAW5-nI5OXJbQAR2--sRyF11BUdAOP0FysLLPWQ9ByVQEXqQMFj3s0d6VCCAzg8krcRZJJJGpQnOFqBl1OaU_uNOLMhC-CTxDpjctxhQjS2W_3b9Xx8-LJLGOWR4CPwHh50lyIf1oBtr7CWT9WkZrLrOFeBQqahIQqgtNzfnEavB4dpZtgqD4BLiPkXZksk2T4X0_kGaTC0Qh3bpLdWoJ2BqFMXU6UJSdMIQV3tqGyVXB4Y-T2e91fzzI_KgVtPqhmiuBOj4C-PsjDR',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwyg0tHmLjmYjTtmdAgZc_EYVEhNhKOqgUL7A44XcT5pPOwG9m9IrhdKPkdhgqnwOjDTvEcolLZqn2QSS6bOrFJdCmgOmI2SSF06BXCys3GTAG_oR6BC3MeDm0LKzd8ahvQLUf3H75txsR7u4NU7tS44VHU9kC_m4vjpYaIg-Bp9JIV6DzQtxy6hIKKpjXquTuuZKn4wAaZHTJZ9ViiAENQkcje49Ub34qMSWVn2pBqhA_w4vJXC8AmMas7w8ggcR6_zsDLLyszBxJ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCrrJNNNYpeCJAGqweXdLRhsb44CItPkNvQ91LawEpcqgM1q1XuFxqf6Lwa54sjDFH6lEq-aAWF8480fPnv06Bx-zsrYvrFZPQ7fHz0iEvGFW9yWxyioOW4RX5d-0pag3TjNyq_pdaKy0GOZ4P2odXjGgu61gnQWgmOcokqSp4graOxmyK2pbtwOWNvGXXqT-KZUCuBqt5x9hnxqaPCVdGuWkdSm-o-5qllmQ2qglI_iWUIYcQpB5ff30_AM6eXAitt82Xxqlkx6Vkq',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByT-cCfliRv_rccxSAK1jNNgbp6kagyGXfHnhm7jIEVaM4EyXCaj7UM4l9cOrchBwNB65qGjJV-J_Am0kV0AKrwRtk6CpuAVCN6Jbi6JuuG8MMaf4BBcJleGOPp-GtBvjXeeX-C-WtkMUbVlVUDEe6lZmpxgKf7OghDtweafv5yYRp_RcxTfevxEqfjTsAkD4B212-jpTvHFtHqc84wdzjW8ZspXFB_t0MVtB29d4LAARojU33-yRRs9Fwtu4d69M05iuzeE84oYtn'
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
    reviewsCount: 3100,
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
    reviewsCount: 1980,
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
    reviewsCount: 1650,
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
  
  // Pending Temples in the Management Console
  {
    id: 'wat-pho-chai',
    name: 'Wat Pho Chai (วัดโพธิ์ชัย)',
    englishName: 'Wat Pho Chai',
    tagline: 'Luminous sanctuary hosting the legendary Luang Pho Phra Sai.',
    description: 'Wat Pho Chai is highly revered, situated in Nong Khai. It houses Luang Pho Phra Sai, a sacred golden Buddha image rumored to have been cast in the Lan Xang kingdom and miraculously delivered across the Mekong river.',
    thaiDescription: 'วัดโพธิ์ชัย เป็นพระอารามหลวงชั้นตรี ชนิดสามัญ ตั้งอยู่ในอำเภอเมืองหนองคาย จังหวัดหนองคาย เป็นที่ประดิษฐานหลวงพ่อพระใส พระพุทธรูปขัดสมาธิราบปางมารวิชัย หล่อด้วยทองสีสุก ซึ่งเป็นที่เคารพสักการะอย่างมากของชาวอีสานและสปป.ลาว',
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

export const initialReviews: Review[] = [
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
    comment: 'Magnificent architecture. Climbing the stairs was a challenge but the view from the top is worth every step. Essential visit in Bangkok.'
  },
  {
    id: 'r3',
    templeId: 'wat-arun',
    author: 'Jane Doe',
    avatarChar: 'J',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Beautifully restored. Make sure to dress respectfully. The ferry ride across the river for 4 baht is part of the experience!'
  },
  {
    id: 'r4',
    templeId: 'wat-arun',
    author: 'Elena Rodriguez',
    avatarChar: 'E',
    rating: 5,
    date: '2 hours ago',
    comment: 'The ascent to the top of the central prang was breathtaking. The sunset view of the Chao Phraya is unmatched. Very peaceful despite the crowds.',
    replied: false
  },
  {
    id: 'r5',
    templeId: 'wat-arun',
    author: 'Kenji Tanaka',
    avatarChar: 'K',
    rating: 4,
    date: 'Yesterday',
    comment: 'Beautiful architecture. However, the ticket counter was a bit confusing for foreign tourists. More signage would be helpful.',
    replied: false
  }
];

export const initialActivities: Activity[] = [
  {
    id: 'act1',
    type: 'verification',
    time: '2 hours ago',
    text: 'System verified ',
    highlightText: 'Wat Arun'
  },
  {
    id: 'act2',
    type: 'review',
    time: '4 hours ago',
    text: 'Ananda M. posted a new 5-star review for ',
    highlightText: 'Wat Saket'
  },
  {
    id: 'act3',
    type: 'user',
    time: '6 hours ago',
    text: 'New Editor registration: Kittichai S.'
  },
  {
    id: 'act4',
    type: 'media',
    time: 'Yesterday at 6:45 PM',
    text: 'Media Upload: 12 new hi-res photos for ',
    highlightText: 'Wat Mahathat'
  }
];
