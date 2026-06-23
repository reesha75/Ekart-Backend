/**
 * ============================================================
 *  seedBulk.js  –  Bulk Product Seeder (Admin)
 * ============================================================
 *  Run independently:  node seedBulk.js
 *  Every product has verified, category-specific image URLs.
 *  Does NOT modify any existing project files.
 * ============================================================
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "node:dns";
import { Product } from "./models/productModel.js";

dotenv.config();
dns.setServers(["8.8.8.8", "8.8.4.4"]);

/**
 * All Unsplash photo IDs below are verified to show the correct
 * category-matching content. Each product gets a unique combo.
 */
const products = [

  // ╔══════════════════════════════════════╗
  // ║          LAPTOPS          (7 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Lenovo IdeaPad Slim 5 14\" Laptop",
    productDesc:
      "Powered by AMD Ryzen 7 and 16 GB RAM, the IdeaPad Slim 5 delivers fast multitasking on a 14-inch Full HD IPS display. Weighing just 1.39 kg with up to 12 hours battery, it's the perfect ultraportable for professionals on the move.",
    productPrice: 74999,
    category: "Laptops",
    brand: "Lenovo",
    productImg: [
      { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", public_id: "lenovo_ideapad_1" },
      { url: "https://images.unsplash.com/photo-1484788984921-03950022c38b?w=800&q=80", public_id: "lenovo_ideapad_2" },
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80", public_id: "lenovo_ideapad_3" },
    ],
  },

  {
    productName: "HP Pavilion 15 Core i7 Laptop",
    productDesc:
      "Experience powerful computing with the HP Pavilion 15, featuring a 13th Gen Intel Core i7, 16 GB DDR5 RAM, and a 512 GB NVMe SSD. The 15.6-inch micro-edge FHD display brings vivid colours to your creative projects, while the B&O audio system ensures an immersive entertainment experience.",
    productPrice: 82999,
    category: "Laptops",
    brand: "HP",
    productImg: [
      { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", public_id: "hp_pavilion_1" },
      { url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80", public_id: "hp_pavilion_2" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", public_id: "hp_pavilion_3" },
    ],
  },

  {
    productName: "Dell Inspiron 14 2-in-1 Touchscreen",
    productDesc:
      "Versatility meets performance in the Dell Inspiron 14 2-in-1. Rotate the 14-inch FHD+ touchscreen into tablet, tent, or laptop mode. Equipped with Intel Core i5, 8 GB RAM, and a 512 GB SSD, it handles everyday workflows with ease while the backlit keyboard keeps you productive after dark.",
    productPrice: 68499,
    category: "Laptops",
    brand: "Dell",
    productImg: [
      { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", public_id: "dell_inspiron_1" },
      { url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80", public_id: "dell_inspiron_2" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", public_id: "dell_inspiron_3" },
    ],
  },

  {
    productName: "Apple MacBook Air M2 13.6\"",
    productDesc:
      "Redesigned around the Apple M2 chip, the MacBook Air delivers blazing-fast performance in a fanless design just 11.3 mm thin. The Liquid Retina display with 500 nits brightness looks incredible in any lighting, while MagSafe charging and up to 18 hours of battery life keep you going all day.",
    productPrice: 114900,
    category: "Laptops",
    brand: "Apple",
    productImg: [
      { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", public_id: "macbook_air_1" },
      { url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80", public_id: "macbook_air_2" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", public_id: "macbook_air_3" },
      { url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80", public_id: "macbook_air_4" },
    ],
  },

  {
    productName: "ASUS VivoBook 15 OLED Laptop",
    productDesc:
      "Immerse yourself in cinema-grade colour with the VivoBook 15's stunning OLED display featuring 100 % DCI-P3 colour gamut. Powered by Intel Core i5-1335U and 16 GB RAM, it handles photo editing, casual gaming, and heavy multitasking effortlessly. The ErgoLift hinge tilts the keyboard for more comfortable typing.",
    productPrice: 61990,
    category: "Laptops",
    brand: "ASUS",
    productImg: [
      { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", public_id: "asus_vivobook_1" },
      { url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80", public_id: "asus_vivobook_2" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", public_id: "asus_vivobook_3" },
    ],
  },

  {
    productName: "Acer Nitro V Gaming Laptop 15.6\"",
    productDesc:
      "Dominate the battlefield with the Acer Nitro V, featuring an Intel Core i5-13420H processor and NVIDIA GeForce RTX 4050 graphics. The 144 Hz FHD IPS display ensures buttery-smooth gameplay while dual-fan cooling keeps thermals in check during extended gaming sessions. Includes 16 GB DDR5 RAM and 512 GB SSD.",
    productPrice: 76999,
    category: "Laptops",
    brand: "Acer",
    productImg: [
      { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", public_id: "acer_nitro_1" },
      { url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80", public_id: "acer_nitro_2" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", public_id: "acer_nitro_3" },
      { url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80", public_id: "acer_nitro_4" },
    ],
  },

  {
    productName: "Samsung Galaxy Book3 Pro 14\" AMOLED",
    productDesc:
      "Samsung's Galaxy Book3 Pro stuns with a 14-inch Dynamic AMOLED 2X display that rivals high-end monitors. The 13th Gen Intel Core i7 and Intel Iris Xe graphics deliver workstation-class performance in a premium 1.17 kg body. Seamless Galaxy ecosystem integration lets you extend your phone's apps to the big screen.",
    productPrice: 108990,
    category: "Laptops",
    brand: "Samsung",
    productImg: [
      { url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80", public_id: "samsung_galaxybook_1" },
      { url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80", public_id: "samsung_galaxybook_2" },
      { url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", public_id: "samsung_galaxybook_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║         MOBILES           (6 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Samsung Galaxy S24 Ultra 256 GB",
    productDesc:
      "Quad 200 MP AI cameras, titanium frame, 6.8-inch Dynamic AMOLED 2X with Vision Booster, and Snapdragon 8 Gen 3 performance. The built-in S Pen makes this the ultimate Android flagship for power users.",
    productPrice: 129999,
    category: "Mobiles",
    brand: "Samsung",
    productImg: [
      { url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80", public_id: "samsung_s24_ultra_1" },
      { url: "https://images.unsplash.com/photo-1534217607047-c31a6edee694?w=800&q=80", public_id: "samsung_s24_ultra_2" },
      { url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&q=80", public_id: "samsung_s24_ultra_3" },
    ],
  },

  {
    productName: "Realme GT 6T 5G 8 GB / 256 GB",
    productDesc:
      "Snapdragon 7+ Gen 3, 120 Hz AMOLED display, and 5,500 mAh battery with 120 W fast charging — fully charged in under 20 minutes. IP65 water resistance makes this the performance-first mid-ranger to beat.",
    productPrice: 30999,
    category: "Mobiles",
    brand: "Realme",
    productImg: [
      { url: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=800&q=80", public_id: "realme_gt6t_1" },
      { url: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80", public_id: "realme_gt6t_2" },
      { url: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=800&q=80", public_id: "realme_gt6t_3" },
    ],
  },

  {
    productName: "Samsung Galaxy A55 5G 128 GB",
    productDesc:
      "6.6-inch Super AMOLED with Vision Booster, Exynos 1480, and a 50 MP OIS triple camera at a mid-range price. Key Island design and Gorilla Glass Victus+ deliver premium looks with real-world durability.",
    productPrice: 29999,
    category: "Mobiles",
    brand: "Samsung",
    productImg: [
      { url: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80", public_id: "samsung_a55_1" },
      { url: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80", public_id: "samsung_a55_2" },
      { url: "https://images.unsplash.com/photo-1574944985-f0b8b69c1b23?w=800&q=80", public_id: "samsung_a55_3" },
    ],
  },

  {
    productName: "Nothing Phone (2a) 128 GB",
    productDesc:
      "Iconic Glyph Interface LEDs, MediaTek Dimensity 7200 Pro, 6.7-inch AMOLED 120 Hz display, and dual 50 MP cameras with AI Night Mode. Disruptive transparent design at a disruptive price.",
    productPrice: 23999,
    category: "Mobiles",
    brand: "Nothing",
    productImg: [
      { url: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80", public_id: "nothing_phone_2a_1" },
      { url: "https://images.unsplash.com/photo-1605170439002-90845e8c0137?w=800&q=80", public_id: "nothing_phone_2a_2" },
      { url: "https://images.unsplash.com/photo-1570101870620-a8a5e7e5db47?w=800&q=80", public_id: "nothing_phone_2a_3" },
    ],
  },

  {
    productName: "Apple iPhone 15 Pro Max 256 GB",
    productDesc:
      "Crafted from aerospace-grade titanium, the iPhone 15 Pro Max introduces the A17 Pro chip — the most powerful chip ever in a smartphone. Capture stunning 4K Cinematic video, enjoy all-day battery life, and use the customisable Action button for instant access to your favourite features.",
    productPrice: 159900,
    category: "Mobiles",
    brand: "Apple",
    productImg: [
      { url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", public_id: "iphone15_promax_1" },
      { url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80", public_id: "iphone15_promax_2" },
      { url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80", public_id: "iphone15_promax_3" },
    ],
  },

  {
    productName: "Google Pixel 8 Pro 128 GB",
    productDesc:
      "Google's smartest phone yet, powered by the Tensor G3 chip with advanced AI capabilities. Magic Eraser, Photo Unblur, and Best Take transform your photography, while 7 years of OS and security updates give you lasting peace of mind. The 6.7-inch Super Actua display shines at 2,400 nits peak brightness.",
    productPrice: 83999,
    category: "Mobiles",
    brand: "Google",
    productImg: [
      { url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80", public_id: "pixel8_pro_1" },
      { url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80", public_id: "pixel8_pro_2" },
      { url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80", public_id: "pixel8_pro_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║       HEADPHONES          (7 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Sony WH-1000XM5 Wireless ANC Headphones",
    productDesc:
      "Two processors and 8 microphones deliver industry-leading noise cancellation. 30-hour battery, LDAC Hi-Res Audio support, and 250 g ultra-lightweight design — the ultimate over-ear headphones for audiophiles and travellers.",
    productPrice: 26990,
    category: "Headphones",
    brand: "Sony",
    productImg: [
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", public_id: "sony_wh1000xm5_1" },
      { url: "https://images.unsplash.com/photo-1590658268037-41d874be2f50?w=800&q=80", public_id: "sony_wh1000xm5_2" },
      { url: "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?w=800&q=80", public_id: "sony_wh1000xm5_3" },
    ],
  },

  {
    productName: "Apple AirPods Pro (2nd Gen) USB-C",
    productDesc:
      "H2 chip delivers 2× stronger Active Noise Cancellation and Personalised Spatial Audio. MagSafe case with built-in speaker, lanyard loop, and up to 6 hours per charge. IP54 water and dust resistant.",
    productPrice: 24900,
    category: "Headphones",
    brand: "Apple",
    productImg: [
      { url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80", public_id: "airpods_pro2_1" },
      { url: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80", public_id: "airpods_pro2_2" },
      { url: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&q=80", public_id: "airpods_pro2_3" },
    ],
  },

  {
    productName: "JBL Tour One M2 Over-Ear Headphones",
    productDesc:
      "True Adaptive Noise Cancelling with Smart Ambient, Hi-Res certified audio, and spatial sound with head-tracking. Leather cushions, 50-hour playtime, and premium build quality for the discerning listener.",
    productPrice: 19999,
    category: "Headphones",
    brand: "JBL",
    productImg: [
      { url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80", public_id: "jbl_tour_one_m2_1" },
      { url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", public_id: "jbl_tour_one_m2_2" },
      { url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80", public_id: "jbl_tour_one_m2_3" },
    ],
  },

  {
    productName: "Bose QuietComfort Ultra Earbuds",
    productDesc:
      "Bose Immersive Audio transforms music into a 3D experience. CustomTune calibrates ANC to your unique ear shape instantly. 6 hours per charge, IPX4 waterproof, and three listening modes.",
    productPrice: 29900,
    category: "Headphones",
    brand: "Bose",
    productImg: [
      { url: "https://images.unsplash.com/photo-1491927570842-0a4779280de3?w=800&q=80", public_id: "bose_qc_ultra_1" },
      { url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80", public_id: "bose_qc_ultra_2" },
      { url: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=800&q=80", public_id: "bose_qc_ultra_3" },
    ],
  },

  {
    productName: "Sennheiser Momentum 4 Wireless",
    productDesc:
      "42 mm audiophile transducer, Adaptive Noise Cancellation, and a record-breaking 60-hour battery. Premium leather headband with alcantara cushions deliver timeless luxury. Personalise every frequency via Smart Control app.",
    productPrice: 24990,
    category: "Headphones",
    brand: "Sennheiser",
    productImg: [
      { url: "https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=800&q=80", public_id: "sennheiser_momentum4_1" },
      { url: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80", public_id: "sennheiser_momentum4_2" },
      { url: "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80", public_id: "sennheiser_momentum4_3" },
    ],
  },

  {
    productName: "boAt Rockerz 551ANC Over-Ear Headphones",
    productDesc:
      "Hybrid Active Noise Cancellation, 40 mm drivers, and ENx technology for clear calls. Up to 100 hours of playback in ANC-off mode and a foldable design make these the best-value over-ears on the market.",
    productPrice: 2999,
    category: "Headphones",
    brand: "boAt",
    productImg: [
      { url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80", public_id: "boat_rockerz_551_1" },
      { url: "https://images.unsplash.com/photo-1528228001-fde5c8cdd07b?w=800&q=80", public_id: "boat_rockerz_551_2" },
      { url: "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&q=80", public_id: "boat_rockerz_551_3" },
    ],
  },

  {
    productName: "Samsung Galaxy Buds FE Wireless Earbuds",
    productDesc:
      "AKG-tuned Active Noise Cancellation with 3-mic pickup and seamless Galaxy pairing. Up to 30 total hours with the charging case, IPX2 water resistance, and a secure wing-tip for all-day wear.",
    productPrice: 6999,
    category: "Headphones",
    brand: "Samsung",
    productImg: [
      { url: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&q=80", public_id: "samsung_buds_fe_1" },
      { url: "https://images.unsplash.com/photo-1632635175701-da69c54cd02e?w=800&q=80", public_id: "samsung_buds_fe_2" },
      { url: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=800&q=80", public_id: "samsung_buds_fe_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║         WATCHES           (6 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Apple Watch Series 9 GPS 45 mm",
    productDesc:
      "S9 SiP with 4-core Neural Engine powers the new Double Tap gesture. Always-on Retina display reaches 2,000 nits for effortless outdoor readability — twice as bright as Series 8.",
    productPrice: 44900,
    category: "Watches",
    brand: "Apple",
    productImg: [
      { url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80", public_id: "apple_watch_s9_1" },
      { url: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&q=80", public_id: "apple_watch_s9_2" },
      { url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80", public_id: "apple_watch_s9_3" },
    ],
  },

  {
    productName: "Samsung Galaxy Watch6 Classic 47 mm",
    productDesc:
      "Iconic rotating bezel meets smart health features. 1.47-inch Super AMOLED, BioActive Sensor for body composition tracking, sleep coaching, sapphire crystal glass, and IP68 + 5 ATM durability.",
    productPrice: 37999,
    category: "Watches",
    brand: "Samsung",
    productImg: [
      { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80", public_id: "samsung_watch6_classic_1" },
      { url: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=800&q=80", public_id: "samsung_watch6_classic_2" },
      { url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80", public_id: "samsung_watch6_classic_3" },
    ],
  },

  {
    productName: "Noise ColorFit Pro 5 Max Smartwatch",
    productDesc:
      "1.96-inch AMOLED display at 410×502 px resolution with Bluetooth calling, 100+ sport modes, SpO2 monitoring, and 7-day battery. The most feature-packed budget smartwatch available today.",
    productPrice: 4499,
    category: "Watches",
    brand: "Noise",
    productImg: [
      { url: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80", public_id: "noise_colorfit_pro5_1" },
      { url: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&q=80", public_id: "noise_colorfit_pro5_2" },
      { url: "https://images.unsplash.com/photo-1542496658-e33a3d9657a9?w=800&q=80", public_id: "noise_colorfit_pro5_3" },
    ],
  },

  {
    productName: "Garmin Venu 3 GPS Smartwatch",
    productDesc:
      "Body Battery energy monitoring, sleep coach with nap detection, and built-in mic & speaker for calls. 1.4-inch AMOLED touchscreen with up to 14-day battery keeps you informed through every training block.",
    productPrice: 49990,
    category: "Watches",
    brand: "Garmin",
    productImg: [
      { url: "https://images.unsplash.com/photo-1461769561786-09bea6f8e034?w=800&q=80", public_id: "garmin_venu3_1" },
      { url: "https://images.unsplash.com/photo-1557935728-e6d1684b193b?w=800&q=80", public_id: "garmin_venu3_2" },
      { url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80", public_id: "garmin_venu3_3" },
    ],
  },

  {
    productName: "Amazfit T-Rex Ultra GPS Adventure Watch",
    productDesc:
      "MIL-STD-810G certified, 100 m water resistant, dual-band GPS with 6 satellite systems. The rugged 1.39-inch AMOLED with anti-fingerprint coating delivers outdoor readability in the harshest environments.",
    productPrice: 31999,
    category: "Watches",
    brand: "Amazfit",
    productImg: [
      { url: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&q=80", public_id: "amazfit_trex_ultra_1" },
      { url: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=800&q=80", public_id: "amazfit_trex_ultra_2" },
      { url: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&q=80", public_id: "amazfit_trex_ultra_3" },
    ],
  },

  {
    productName: "Titan Smart Pro Smartwatch",
    productDesc:
      "1.43-inch AMOLED Always-On display with rotating crown navigation, single-chip GPS, 100+ watch faces, and 100+ sport modes. Indian craftsmanship fused with cutting-edge smartwatch technology at a great value.",
    productPrice: 8495,
    category: "Watches",
    brand: "Titan",
    productImg: [
      { url: "https://images.unsplash.com/photo-1615380547913-75e850c55ff3?w=800&q=80", public_id: "titan_smart_pro_1" },
      { url: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7d3?w=800&q=80", public_id: "titan_smart_pro_2" },
      { url: "https://images.unsplash.com/photo-1585386959604-b6f039ab684c?w=800&q=80", public_id: "titan_smart_pro_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║       ACCESSORIES         (6 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Apple 20 W USB-C Power Adapter",
    productDesc:
      "Fast-charge iPhone to 50% in around 30 minutes. Compact, lightweight, and optimised for iPhone, iPad, and AirPods. Compatible with any USB-C Power Delivery device for universal fast charging.",
    productPrice: 1900,
    category: "Accessories",
    brand: "Apple",
    productImg: [
      { url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80", public_id: "apple_20w_usbc_1" },
      { url: "https://images.unsplash.com/photo-1612815154758-7cc565e5ad3a?w=800&q=80", public_id: "apple_20w_usbc_2" },
      { url: "https://images.unsplash.com/photo-1601148166018-94e1f9ae30e7?w=800&q=80", public_id: "apple_20w_usbc_3" },
    ],
  },

  {
    productName: "Anker PowerCore 20000 mAh Power Bank",
    productDesc:
      "Never run dry — 20,000 mAh with dual USB-A and USB-C for simultaneous charging. PowerIQ 3.0 delivers optimised 18 W speeds while MultiProtect safety guards against overheating. Slim and travel-ready.",
    productPrice: 3499,
    category: "Accessories",
    brand: "Anker",
    productImg: [
      { url: "https://images.unsplash.com/photo-1585771724684-38798054ea85?w=800&q=80", public_id: "anker_powercore_1" },
      { url: "https://images.unsplash.com/photo-1609592179195-bc39b7a3b86f?w=800&q=80", public_id: "anker_powercore_2" },
      { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", public_id: "anker_powercore_3" },
    ],
  },

  {
    productName: "Samsung 256 GB EVO Plus microSD Card",
    productDesc:
      "Up to 160 MB/s read speeds expand phone, tablet, drone, and action camera storage. UHS-I U3 / A2 rated for 4K recording and professional photography. 10-year limited warranty included.",
    productPrice: 1799,
    category: "Accessories",
    brand: "Samsung",
    productImg: [
      { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", public_id: "samsung_evo_plus_1" },
      { url: "https://images.unsplash.com/photo-1591488196-fbe6e4a96e2c?w=800&q=80", public_id: "samsung_evo_plus_2" },
      { url: "https://images.unsplash.com/photo-1618383532427-5b1f2c95dd22?w=800&q=80", public_id: "samsung_evo_plus_3" },
    ],
  },

  {
    productName: "Logitech MX Master 3S Wireless Mouse",
    productDesc:
      "8,000 DPI precision and MagSpeed electromagnetic scroll wheel for pixel-perfect productivity. Quiet clicks, tri-device pairing via Bluetooth or Logi Bolt USB, and an ergonomic sculpt built for all-day comfort.",
    productPrice: 8495,
    category: "Accessories",
    brand: "Logitech",
    productImg: [
      { url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80", public_id: "logitech_mx_master3s_1" },
      { url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80", public_id: "logitech_mx_master3s_2" },
      { url: "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=800&q=80", public_id: "logitech_mx_master3s_3" },
    ],
  },

  {
    productName: "Belkin 3-in-1 MagSafe Wireless Charger",
    productDesc:
      "Charge iPhone, Apple Watch, and AirPods simultaneously. Official MagSafe delivers up to 15 W to iPhone with Apple Watch Fast Charging support. Sleek chrome and matte finish for any desk or nightstand.",
    productPrice: 12999,
    category: "Accessories",
    brand: "Belkin",
    productImg: [
      { url: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=800&q=80", public_id: "belkin_magsafe_3in1_1" },
      { url: "https://images.unsplash.com/photo-1610438235354-a6ae5528a612?w=800&q=80", public_id: "belkin_magsafe_3in1_2" },
      { url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80", public_id: "belkin_magsafe_3in1_3" },
    ],
  },

  {
    productName: "Spigen Ultra Hybrid Case – iPhone 15 Pro",
    productDesc:
      "Crystal-clear military-grade drop protection. Air Cushion Technology absorbs corner shocks, raised bezels shield the display and camera, and anti-yellowing keeps the case looking pristine for longer.",
    productPrice: 1499,
    category: "Accessories",
    brand: "Spigen",
    productImg: [
      { url: "https://images.unsplash.com/photo-1592434134753-a70baf7979d5?w=800&q=80", public_id: "spigen_ultra_hybrid_1" },
      { url: "https://images.unsplash.com/photo-1587302164675-820fe61bbd55?w=800&q=80", public_id: "spigen_ultra_hybrid_2" },
      { url: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=800&q=80", public_id: "spigen_ultra_hybrid_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║         GAMING            (6 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Sony PlayStation 5 Slim Digital Edition",
    productDesc:
      "Next-gen 4K gaming, ultra-fast SSD, and immersive 3D Audio. DualSense haptic feedback and adaptive triggers transform every game. 30% slimmer than the original PS5 with 1 TB internal storage.",
    productPrice: 39990,
    category: "Gaming",
    brand: "Sony",
    productImg: [
      { url: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=800&q=80", public_id: "sony_ps5_slim_1" },
      { url: "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=800&q=80", public_id: "sony_ps5_slim_2" },
      { url: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=800&q=80", public_id: "sony_ps5_slim_3" },
    ],
  },

  {
    productName: "Xbox Series X 1 TB Console",
    productDesc:
      "True 4K at up to 120 FPS with 1 TB custom NVMe SSD and Xbox Velocity Architecture. Quick Resume switches between multiple games almost instantly. Backward compatible across four generations of Xbox.",
    productPrice: 49990,
    category: "Gaming",
    brand: "Microsoft",
    productImg: [
      { url: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&q=80", public_id: "xbox_series_x_1" },
      { url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80", public_id: "xbox_series_x_2" },
      { url: "https://images.unsplash.com/photo-1585188842039-10ef553b0ab3?w=800&q=80", public_id: "xbox_series_x_3" },
    ],
  },

  {
    productName: "Nintendo Switch OLED Model – White",
    productDesc:
      "Vibrant 7-inch OLED screen for handheld mode, wide adjustable stand, enhanced audio, 64 GB storage, and a LAN port in the dock for stable online play. The iconic gaming platform — now more brilliant.",
    productPrice: 34999,
    category: "Gaming",
    brand: "Nintendo",
    productImg: [
      { url: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=800&q=80", public_id: "nintendo_switch_oled_1" },
      { url: "https://images.unsplash.com/photo-1616588589279-0b16a8ff3d3d?w=800&q=80", public_id: "nintendo_switch_oled_2" },
      { url: "https://images.unsplash.com/photo-1559816046-0c1be89db9df?w=800&q=80", public_id: "nintendo_switch_oled_3" },
    ],
  },

  {
    productName: "Razer BlackWidow V4 Mechanical Keyboard",
    productDesc:
      "Razer Green mechanical switches, per-key Chroma RGB with 16.8 million colours, dedicated macro column, multi-function roller, and a magnetic plush wrist rest — total command at your fingertips.",
    productPrice: 15999,
    category: "Gaming",
    brand: "Razer",
    productImg: [
      { url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80", public_id: "razer_blackwidow_v4_1" },
      { url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80", public_id: "razer_blackwidow_v4_2" },
      { url: "https://images.unsplash.com/photo-1595044426077-d36d9236d44e?w=800&q=80", public_id: "razer_blackwidow_v4_3" },
    ],
  },

  {
    productName: "SteelSeries Arctis Nova Pro Wireless Headset",
    productDesc:
      "Hi-Fi gaming audio with ANC, custom neodymium drivers, simultaneous 2.4 GHz and Bluetooth, and hot-swappable batteries for infinite playtime. AI-powered ClearCast mic ensures your comms are crystal clear.",
    productPrice: 29999,
    category: "Gaming",
    brand: "SteelSeries",
    productImg: [
      { url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80", public_id: "steelseries_arctis_nova_1" },
      { url: "https://images.unsplash.com/photo-1567778765898-8addc990f28b?w=800&q=80", public_id: "steelseries_arctis_nova_2" },
      { url: "https://images.unsplash.com/photo-1598550476359-4cfe0e6c1e7b?w=800&q=80", public_id: "steelseries_arctis_nova_3" },
    ],
  },

  {
    productName: "Logitech G502 X PLUS Wireless Gaming Mouse",
    productDesc:
      "LIGHTFORCE hybrid switches, HERO 25K sensor at 25,600 DPI, LIGHTSYNC RGB across 8 zones, and LIGHTSPEED 1 ms wireless response. Precision engineering built for tournament-level competitive play.",
    productPrice: 13995,
    category: "Gaming",
    brand: "Logitech",
    productImg: [
      { url: "https://images.unsplash.com/photo-1560419015-7c708e1d9084?w=800&q=80", public_id: "logitech_g502x_plus_1" },
      { url: "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800&q=80", public_id: "logitech_g502x_plus_2" },
      { url: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80", public_id: "logitech_g502x_plus_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║         TABLETS           (4 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Apple iPad Air M2 11\" Wi-Fi 128 GB",
    productDesc:
      "M2-powered laptop-class performance with all-day battery. 11-inch Liquid Retina display supports Apple Pencil Pro and Magic Keyboard. Center Stage keeps you framed perfectly in every video call.",
    productPrice: 59900,
    category: "Tablets",
    brand: "Apple",
    productImg: [
      { url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80", public_id: "ipad_air_m2_1" },
      { url: "https://images.unsplash.com/photo-1561154464-82e9aab73f73?w=800&q=80", public_id: "ipad_air_m2_2" },
      { url: "https://images.unsplash.com/photo-1587614382346-6d5b8f3e2614?w=800&q=80", public_id: "ipad_air_m2_3" },
    ],
  },

  {
    productName: "Samsung Galaxy Tab S9 FE 10.9\" 128 GB",
    productDesc:
      "10.9-inch TFT display, 90 Hz, IP68, and an included S Pen. Exynos 1380, 6 GB RAM, and 8,000 mAh battery power through all-day multitasking and media consumption without slowing down.",
    productPrice: 29999,
    category: "Tablets",
    brand: "Samsung",
    productImg: [
      { url: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=800&q=80", public_id: "samsung_tab_s9fe_1" },
      { url: "https://images.unsplash.com/photo-1609252926651-2fbd91e64ceb?w=800&q=80", public_id: "samsung_tab_s9fe_2" },
      { url: "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?w=800&q=80", public_id: "samsung_tab_s9fe_3" },
    ],
  },

  {
    productName: "Lenovo Tab P12 12.7\" 128 GB",
    productDesc:
      "12.7-inch 2K display ideal for streaming, reading, and creative work. Quad JBL speakers with Dolby Atmos. Precision pen and keyboard folio included — a complete tablet-to-laptop setup out of the box.",
    productPrice: 27999,
    category: "Tablets",
    brand: "Lenovo",
    productImg: [
      { url: "https://images.unsplash.com/photo-1632015324638-3e6738c50d43?w=800&q=80", public_id: "lenovo_tab_p12_1" },
      { url: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&q=80", public_id: "lenovo_tab_p12_2" },
      { url: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=800&q=80", public_id: "lenovo_tab_p12_3" },
    ],
  },

  {
    productName: "OnePlus Pad 11.6\" 8 GB / 128 GB",
    productDesc:
      "MediaTek Dimensity 9000 flagship performance on an 11.6-inch 2.8K 144 Hz Dolby Vision display. 9,510 mAh battery with 67 W SUPERVOOC charging means hours of entertainment with minimal downtime.",
    productPrice: 37999,
    category: "Tablets",
    brand: "OnePlus",
    productImg: [
      { url: "https://images.unsplash.com/photo-1622532546471-a5e4a3d3ffe4?w=800&q=80", public_id: "oneplus_pad_1" },
      { url: "https://images.unsplash.com/photo-1604336755603-a07ba4a2b6c6?w=800&q=80", public_id: "oneplus_pad_2" },
      { url: "https://images.unsplash.com/photo-1471477956578-d38e2678ffb3?w=800&q=80", public_id: "oneplus_pad_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║         CAMERAS           (4 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "Sony Alpha A6400 Mirrorless Camera Body",
    productDesc:
      "World's fastest AF at 0.02 s with 425 phase-detection points covering 84% of the frame. Real-time Eye AF, 24.2 MP APS-C sensor, and 4K HDR video deliver professional content in a compact body.",
    productPrice: 79990,
    category: "Cameras",
    brand: "Sony",
    productImg: [
      { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80", public_id: "sony_a6400_1" },
      { url: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800&q=80", public_id: "sony_a6400_2" },
      { url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", public_id: "sony_a6400_3" },
    ],
  },

  {
    productName: "Canon EOS R50 Mirrorless Camera Kit",
    productDesc:
      "24.2 MP APS-C CMOS sensor with DIGIC X processor, uncropped 4K 30p video, and advanced Subject Detection AF for people, animals, and vehicles. Lightweight at 375 g — take it everywhere.",
    productPrice: 62995,
    category: "Cameras",
    brand: "Canon",
    productImg: [
      { url: "https://images.unsplash.com/photo-1452780212412-02c3c55e0e6a?w=800&q=80", public_id: "canon_eos_r50_1" },
      { url: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2c?w=800&q=80", public_id: "canon_eos_r50_2" },
      { url: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&q=80", public_id: "canon_eos_r50_3" },
    ],
  },

  {
    productName: "Nikon Z30 Vlogging Mirrorless Camera",
    productDesc:
      "Built for creators — flip-out touchscreen, uncropped 4K UHD video, 20.9 MP DX sensor, and full NIKKOR Z lens compatibility. Lightweight at 405 g. No viewfinder distraction, just you and your audience.",
    productPrice: 54995,
    category: "Cameras",
    brand: "Nikon",
    productImg: [
      { url: "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80", public_id: "nikon_z30_1" },
      { url: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800&q=80", public_id: "nikon_z30_2" },
      { url: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&q=80", public_id: "nikon_z30_3" },
    ],
  },

  {
    productName: "GoPro HERO12 Black Action Camera",
    productDesc:
      "5.3K60 video, HyperSmooth 6.0 stabilisation, waterproof to 10 m without a housing, and Max Lens Mod 2.0 for the widest field of view ever on a GoPro. Document every adventure in stunning detail.",
    productPrice: 39500,
    category: "Cameras",
    brand: "GoPro",
    productImg: [
      { url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80", public_id: "gopro_hero12_1" },
      { url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", public_id: "gopro_hero12_2" },
      { url: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80", public_id: "gopro_hero12_3" },
    ],
  },


  // ╔══════════════════════════════════════╗
  // ║        SPEAKERS           (4 items)          ║
  // ╚══════════════════════════════════════╝

  {
    productName: "JBL Charge 5 Portable Bluetooth Speaker",
    productDesc:
      "JBL Original Pro Sound with long-excursion driver and dual passive radiators. IP67 waterproof and dustproof, 20-hour playtime, and a built-in power bank keep the music playing through any outdoor adventure.",
    productPrice: 14999,
    category: "Speakers",
    brand: "JBL",
    productImg: [
      { url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80", public_id: "jbl_charge5_1" },
      { url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80", public_id: "jbl_charge5_2" },
      { url: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=800&q=80", public_id: "jbl_charge5_3" },
    ],
  },

  {
    productName: "Sonos Era 300 Spatial Audio Speaker",
    productDesc:
      "Six precision-tuned drivers deliver Dolby Atmos spatial audio that fills every corner of the room. Trueplay tuning adapts the sound to your space automatically. Supports AirPlay 2, Bluetooth, and the Sonos app.",
    productPrice: 44900,
    category: "Speakers",
    brand: "Sonos",
    productImg: [
      { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", public_id: "sonos_era300_1" },
      { url: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=800&q=80", public_id: "sonos_era300_2" },
      { url: "https://images.unsplash.com/photo-1519519256-4bf028d2d99c?w=800&q=80", public_id: "sonos_era300_3" },
    ],
  },

  {
    productName: "Marshall Emberton II Bluetooth Speaker",
    productDesc:
      "Signature Marshall sound in a rugged IP67 body with 30-hour battery life. Multi-directional audio delivers a wide stereo field regardless of placement. Stack & Link wirelessly with other Marshall speakers.",
    productPrice: 13999,
    category: "Speakers",
    brand: "Marshall",
    productImg: [
      { url: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80", public_id: "marshall_emberton2_1" },
      { url: "https://images.unsplash.com/photo-1519981337-6129fc4be82a?w=800&q=80", public_id: "marshall_emberton2_2" },
      { url: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3?w=800&q=80", public_id: "marshall_emberton2_3" },
    ],
  },

  {
    productName: "Amazon Echo Dot (5th Gen) Smart Speaker",
    productDesc:
      "Bigger, fuller sound with improved bass. Built-in temperature sensor, Eero Wi-Fi extender, and hands-free Alexa control for music, smart home management, reminders, and more. Small size, big possibilities.",
    productPrice: 4999,
    category: "Speakers",
    brand: "Amazon",
    productImg: [
      { url: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&q=80", public_id: "amazon_echo_dot5_1" },
      { url: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=800&q=80", public_id: "amazon_echo_dot5_2" },
      { url: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80", public_id: "amazon_echo_dot5_3" },
    ],
  },

];
// ── Seed Logic ──────────────────────────────────────────────

const seedDatabase = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // Uncomment below to clear old seeded products before re-inserting
    // await Product.deleteMany({});
    // console.log("🗑️  Cleared existing products\n");

    const inserted = await Product.insertMany(products);
    console.log(`🚀 Successfully seeded ${inserted.length} products!\n`);

    const categories = [...new Set(products.map((p) => p.category))];
    console.log("📦 Breakdown by category:");
    categories.forEach((cat) => {
      const count = products.filter((p) => p.category === cat).length;
      console.log(`   • ${cat}: ${count} products`);
    });
    console.log(`\n✨ Total: ${inserted.length} products inserted.\n`);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed.");
    process.exit(0);
  }
};

seedDatabase();
