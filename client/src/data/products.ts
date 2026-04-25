// SVG Imports (Existing assets)
import potSvg from '../assets/pot.svg';
import chargerSvg from '../assets/charger.svg';
import soupmakerSvg from '../assets/soupmaker.svg';
import tvSvg from '../assets/smarttv.svg';
import ironSvg from '../assets/watt.svg';

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images: [string, string, string, string]; // Exactly 4 images
    category: string;
    rating: number;
    stockInfo: string;
    recommended?: boolean;
    description: string;
    specifications: { label: string; value: string }[];
    reviews: { author: string; rating: number; text: string; avatar?: string }[];
}

export const products: Product[] = [
    // ── ROW 1 (Page 1) ──────────────────────────────────────────
    {
        id: 'vortex-pro-16',
        name: "VORTEX PRO 16",
        price: 1899.00,
        image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800"
        ],
        category: "LAPTOPS",
        rating: 5,
        stockInfo: "In Stock",
        description: "The ultimate developer machine with M3 Ultra chip.",
        specifications: [{ label: "Chip", value: "M3 ULTRA" }, { label: "Storage", value: "64GB / 2TB" }],
        reviews: []
    },
    {
        id: 'sonic-aura-x',
        name: "SONIC AURA X",
        price: 549.00,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"
        ],
        category: "AUDIO",
        rating: 5,
        stockInfo: "In Stock",
        description: "Active Noise Cancelling over-ear headphones with 60-hour battery.",
        specifications: [{ label: "Feature", value: "ACTIVE NOISE CANCELLING" }],
        reviews: []
    },
    {
        id: 'horizon-chrono',
        name: "HORIZON CHRONO",
        price: 899.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800"
        ],
        category: "WEARABLES",
        rating: 5,
        stockInfo: "In Stock",
        description: "Titanium and sapphire luxury smartwatch.",
        specifications: [{ label: "Material", value: "TITANIUM / SAPPHIRE" }],
        reviews: []
    },
    {
        id: 'canvas-air-13',
        name: "CANVAS AIR 13",
        price: 1199.00,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1527698266440-12104e498b76?auto=format&fit=crop&q=80&w=800"
        ],
        category: "LAPTOPS",
        rating: 5,
        stockInfo: "In Stock",
        description: "Super retina display ultrabook.",
        specifications: [{ label: "Display", value: "SUPER RETINA DISPLAY" }],
        reviews: []
    },
    // ── ROW 2 (Page 1) ──────────────────────────────────────────
    {
        id: 'vision-flow-49',
        name: "VISION FLOW 49",
        price: 1499.00,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&q=80&w=800"
        ],
        category: "LAPTOPS",
        rating: 5,
        stockInfo: "In Stock",
        description: "Ultrawide 240Hz curved gaming monitor.",
        specifications: [{ label: "Refresh", value: "240HZ / NANO IPS" }],
        reviews: []
    },
    {
        id: 'pure-audio-pro',
        name: "PURE AUDIO PRO",
        price: 329.00,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800"
        ],
        category: "AUDIO",
        rating: 4,
        stockInfo: "In Stock",
        description: "Studio reference quality over-ear headphones.",
        specifications: [{ label: "Quality", value: "STUDIO REFERENCE QUALITY" }],
        reviews: []
    },
    {
        id: 'nexus-ultra',
        name: "NEXUS ULTRA",
        price: 1099.00,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1580910051074-3eb694886f6b?auto=format&fit=crop&q=80&w=800"
        ],
        category: "WEARABLES",
        rating: 5,
        stockInfo: "In Stock",
        description: "200MP flagship smartphone with 512GB storage.",
        specifications: [{ label: "Camera", value: "200MP / 512GB" }],
        reviews: []
    },
    {
        id: 'tactile-one',
        name: "TACTILE ONE",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1561241142-0e31a48f4a01?auto=format&fit=crop&q=80&w=800"
        ],
        category: "LAPTOPS",
        rating: 5,
        stockInfo: "Low Stock",
        description: "Mechanical Bluetooth keyboard with RGB backlight.",
        specifications: [{ label: "Type", value: "MECHANICAL / BLUETOOTH" }],
        reviews: []
    },
    // ── PAGE 2 ──────────────────────────────────────────
    {
        id: 'airforce-1',
        name: "White AirForce 1's, size 7-9",
        price: 112.55,
        originalPrice: 150.00,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000",
            "https://images.unsplash.com/photo-1600269112346-5b4bcc10608d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Footwear",
        rating: 5,
        stockInfo: "21 pair left in stock",
        description: "Classic court style meets modern comfort. These iconic sneakers feature premium leather and responsive cushioning.",
        specifications: [{ label: "Material", value: "Leather" }, { label: "Sole", value: "Rubber" }],
        reviews: [{ author: "Sarah J.", rating: 5, text: "Absolutely incredible style. They fit perfectly." }]
    },
    {
        id: 'oxford-shoe',
        name: "Oxford shoe - Black- sam",
        price: 300.45,
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Footwear",
        rating: 3,
        stockInfo: "not available in stock",
        description: "Handcrafted leather oxfords for the modern gentleman. Timeless design with a high-shine finish.",
        specifications: [{ label: "Material", value: "Full Grain Leather" }],
        reviews: []
    },
    {
        id: 'air-jordan-1',
        name: "Air Jordan 1's",
        price: 220.55,
        image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Footwear",
        rating: 5,
        stockInfo: "50 pair left in stock",
        description: "The sneaker that started it all. Premium construction and bold coloring make this a must-have.",
        specifications: [{ label: "Series", value: "Retro High OG" }],
        reviews: []
    },
    {
        id: 'jordan-4-military',
        name: "Jordan 4 - Military Blue",
        price: 400.00,
        originalPrice: 450.00,
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Footwear",
        rating: 5,
        stockInfo: "10 pair left in stock",
        recommended: true,
        description: "A cultural icon returns. The Jordan 4 'Military Blue' features the classic colorway.",
        specifications: [{ label: "Colorway", value: "Military Blue" }],
        reviews: []
    },
    {
        id: 'new-balance-runners',
        name: "New Balance - Runners- Men",
        price: 92.88,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Footwear",
        rating: 5,
        stockInfo: "21 pair left in stock",
        description: "Performance meets everyday style. Lightweight and breathable for all-day comfort.",
        specifications: [{ label: "Style", value: "Running / Casual" }],
        reviews: []
    },
    {
        id: 'wireless-headphones',
        name: "Bluetooth Wireless Headphones",
        price: 33.00,
        originalPrice: 71.34,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800"
        ],
        category: "AUDIO",
        rating: 5,
        stockInfo: "15 left in stock",
        recommended: true,
        description: "Experience studio-quality sound with our flagship wireless headphones.",
        specifications: [
            { label: "Driver Size", value: "40mm Dynamic" },
            { label: "Battery Life", value: "40 Hours" }
        ],
        reviews: [
            { author: "Sarah J.", rating: 5, text: "Absolutely incredible soundstage.", avatar: "https://i.pravatar.cc/150?u=sarah" },
            { author: "Michael R.", rating: 4, text: "ANC works perfectly.", avatar: "https://i.pravatar.cc/150?u=mike" },
            { author: "David L.", rating: 5, text: "The build quality feels very premium.", avatar: "https://i.pravatar.cc/150?u=david" }
        ]
    },
    {
        id: 'instant-pot',
        name: "Instant Pot Duo Plus, 6-Quart Whisper",
        price: 31.88,
        image: potSvg,
        images: [potSvg, "/instantpot.jpg", potSvg, potSvg],
        category: "Kitchen",
        rating: 5,
        stockInfo: "21 left in stock",
        recommended: true,
        description: "Cook faster, eat healthier. The 9-in-1 multicooker that replaces your pressure cooker.",
        specifications: [{ label: "Capacity", value: "6 Quart" }],
        reviews: []
    },
    {
        id: 'portable-charger',
        name: "INIU Portable Charger",
        price: 18.90,
        image: chargerSvg,
        images: [chargerSvg, "/charger.jpg", chargerSvg, chargerSvg],
        category: "Electronics",
        rating: 4,
        stockInfo: "not available in stock",
        description: "The thinnest 10000mAh power bank on the market.",
        specifications: [{ label: "Capacity", value: "10000mAh" }],
        reviews: []
    },
    // ── PAGE 3 ──────────────────────────────────────────
    {
        id: 'soup-maker',
        name: "Philips Viva Collection SoupMaker",
        price: 8.90,
        image: soupmakerSvg,
        images: [soupmakerSvg, "/soupmaker.jpg", soupmakerSvg, soupmakerSvg],
        category: "Kitchen",
        rating: 5,
        stockInfo: "10 left in stock",
        recommended: true,
        description: "Creamy soups in minutes.",
        specifications: [{ label: "Type", value: "Automatic SoupMaker" }],
        reviews: []
    },
    {
        id: 'smart-tv',
        name: "VIZIO 32-inch HD Smart TV 720p LED",
        price: 80.33,
        image: tvSvg,
        images: [tvSvg, "/tv.jpg", tvSvg, tvSvg],
        category: "Electronics",
        rating: 4,
        stockInfo: "Re-stocked soon",
        recommended: true,
        description: "Stream everything you love.",
        specifications: [{ label: "Resolution", value: "720p LED" }],
        reviews: []
    },
    {
        id: 'steam-iron',
        name: "Sunbeam Steammaster 1400 Watt Iron",
        price: 18.88,
        image: "https://images.unsplash.com/photo-1596720426673-e4774457fd39?auto=format&fit=crop&q=80&w=800",
        images: ["https://images.unsplash.com/photo-1596720426673-e4774457fd39?auto=format&fit=crop&q=80&w=800", "/iron.jpg", ironSvg, ironSvg],
        category: "Home",
        rating: 5,
        stockInfo: "Re-stocked soon",
        description: "Wrinkle-free results.",
        specifications: [{ label: "Power", value: "1400 Watt" }],
        reviews: []
    },
    {
        id: 'smart-watch',
        name: "Pro Watch Series 8",
        price: 129.00,
        image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1546868871-af0de0ae72be?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1544117518-30df5780cbc6?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1546868871-af0de0ae72be?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1546868871-af0de0ae72be?auto=format&fit=crop&q=80&w=800"
        ],
        category: "WEARABLES",
        rating: 5,
        stockInfo: "In Stock",
        description: "The ultimate health and fitness companion.",
        specifications: [{ label: "Feature", value: "Health Tracking" }],
        reviews: []
    },
    {
        id: 'bt-speaker',
        name: "Boom Port Speaker",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800"
        ],
        category: "AUDIO",
        rating: 4,
        stockInfo: "Low Stock",
        description: "Portable 360-degree sound.",
        specifications: [{ label: "Sound", value: "360° Surround" }],
        reviews: []
    },
    {
        id: 'coffee-maker',
        name: "Nespresso Essenza Mini",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Kitchen",
        rating: 5,
        stockInfo: "In Stock",
        description: "Modern design with ultra-compact size.",
        specifications: [{ label: "Type", value: "Capsule Machine" }],
        reviews: []
    },
    {
        id: 'air-fryer',
        name: "Ninja Air Fryer XL",
        price: 119.00,
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Kitchen",
        rating: 5,
        stockInfo: "In Stock",
        description: "Guilt-free fried food.",
        specifications: [{ label: "Capacity", value: "5.5 Quart XL" }],
        reviews: []
    },
    {
        id: 'blender-pro',
        name: "Vitamix Explorian Series",
        price: 289.00,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Kitchen",
        rating: 5,
        stockInfo: "In Stock",
        description: "Professional grade power in your kitchen.",
        specifications: [{ label: "Motor", value: "2 HP Motor" }],
        reviews: []
    },
    {
        id: 'vacuum-cleaner',
        name: "Dyson V11 Cordless Vacuum",
        price: 499.00,
        image: "https://images.unsplash.com/photo-1558317374-067df38d01dd?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1558317374-067df38d01dd?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1558317374-067df38d01dd?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1558317374-067df38d01dd?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Home",
        rating: 5,
        stockInfo: "Low Stock",
        description: "Deep cleans anywhere.",
        specifications: [{ label: "Runtime", value: "60 Minutes" }],
        reviews: []
    },
    {
        id: 'tower-fan',
        name: "Dyson Pure Cool Link",
        price: 329.00,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Home",
        rating: 4,
        stockInfo: "Out of Stock",
        description: "Cleans the air you breathe.",
        specifications: [{ label: "Feature", value: "HEPA Filter" }],
        reviews: []
    },
    {
        id: 'electric-drill',
        name: "DEWALT 20V Max Drill",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Home",
        rating: 5,
        stockInfo: "In Stock",
        description: "Unmatched performance and durability.",
        specifications: [{ label: "Voltage", value: "20V MAX" }],
        reviews: []
    },
    {
        id: 'led-desk-lamp',
        name: "Modern Task Lamp",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Home",
        rating: 5,
        stockInfo: "In Stock",
        description: "Sleek and energy efficient.",
        specifications: [{ label: "Type", value: "LED Adjustable" }],
        reviews: []
    }
];
