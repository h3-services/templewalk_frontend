const BACKEND_URL = "https://hope3services.cloud/api";

const guideData = [
    {
        title: "Physical Readiness",
        description: "Essential tips to prepare your body for the long-distance walking pilgrimage.",
        icon: "Shield",
        items: [
            {
                title: "Build Your Stamina",
                content: "Start walking 2–3 miles daily at least two weeks before the event, gradually increasing the distance to build leg strength."
            },
            {
                title: "Footwear Selection",
                content: "Use well-broken-in walking shoes or sneakers. Avoid wearing brand-new shoes on the day of the Yatra to prevent blisters."
            },
            {
                title: "Stretching Routine",
                content: "Practice basic calf and hamstring stretches every morning to improve flexibility and reduce the risk of muscle cramps during the walk."
            }
        ]
    },
    {
        title: "Spiritual Discipline (Vratham)",
        description: "Guidelines to prepare your mind and spirit for the sacred journey.",
        icon: "Flame",
        items: [
            {
                title: "Daily Chanting",
                content: "Spend 15 minutes each day reciting Murugan Shlokas or \"Om Sharavana Bhava\" to align your thoughts with the pilgrimage."
            },
            {
                title: "Dietary Purity",
                content: "Follow a simple, 'Sattvic' vegetarian diet in the days leading up to the Yatra to keep your body light and your mind focused."
            },
            {
                title: "Setting Your Sankalpam",
                content: "Define a personal prayer or intention for your walk, which will help you stay motivated when the path becomes physically challenging."
            }
        ]
    },
    {
        title: "Essential Packing List",
        description: "A checklist of must-have items to carry in your small backpack.",
        icon: "ShoppingBag",
        items: [
            {
                title: "Hydration Kit",
                content: "Carry a reusable water bottle. Electrolyte powders (like ORS) are highly recommended to stay hydrated under the Texas sun."
            },
            {
                title: "Sun Protection",
                content: "Pack a wide-brimmed hat, UV-protection sunglasses, and sweat-resistant sunscreen to shield yourself from direct heat."
            },
            {
                title: "Personal Care",
                content: "Keep a small kit with extra cotton socks, a few band-aids for hotspots, and any personal medications you may need."
            }
        ]
    },
    {
        title: "Health & Safety",
        description: "How to stay safe on the route and use the app’s emergency features.",
        icon: "Heart",
        items: [
            {
                title: "Using the SOS Button",
                content: "If you feel dizzy, exhausted, or injured, use the SOS button in the app immediately to alert the nearby volunteer team."
            },
            {
                title: "Pacing Yourself",
                content: "Walk at a steady, rhythmic pace. It is a pilgrimage, not a race; listen to your body and take short breaks at designated stops."
            },
            {
                title: "Blister Management",
                content: "Apply anti-chafing cream or petroleum jelly to your feet before you start the walk to minimize friction and prevent painful blisters."
            }
        ]
    },
    {
        title: "Yatra Etiquette",
        description: "Guidelines for maintaining harmony and respect during the group walk.",
        icon: "Smile",
        items: [
            {
                title: "Follow the Route",
                content: "Stay within the designated paths shown on the app's map to ensure the safety of the group and follow local traffic rules."
            },
            {
                title: "Keep It Clean",
                content: "Help us maintain the sanctity of the route by disposing of all trash, especially plastic bottles, in the bins provided at temple stops."
            },
            {
                title: "Rest Stop Discipline",
                content: "Follow the instructions of the volunteers at each temple stop for registration, water distribution, and Prasad to ensure a smooth flow for everyone."
            }
        ]
    }
];

async function seed() {
    console.log("Starting seed process...");

    for (const cat of guideData) {
        console.log(`Creating category: ${cat.title}`);
        try {
            const catRes = await fetch(`${BACKEND_URL}/guide/categories/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: cat.title,
                    description: cat.description,
                    icon_url: cat.icon
                })
            });

            if (!catRes.ok) {
                console.error(`Failed to create category ${cat.title}: ${catRes.statusText}`);
                continue;
            }

            const catData = await catRes.json();
            const categoryId = catData.category_id;
            console.log(`Created category ${cat.title} with ID: ${categoryId}`);

            for (const item of cat.items) {
                console.log(`  Adding item: ${item.title}`);
                const itemRes = await fetch(`${BACKEND_URL}/guide/items/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        category_id: categoryId,
                        title: item.title,
                        content: item.content,
                        image_url: ""
                    })
                });

                if (!itemRes.ok) {
                    console.error(`  Failed to add item ${item.title}: ${itemRes.statusText}`);
                } else {
                    console.log(`  Added item: ${item.title}`);
                }
            }
        } catch (error) {
            console.error(`Error processing category ${cat.title}:`, error);
        }
    }
    console.log("Seed process completed.");
}

seed();
