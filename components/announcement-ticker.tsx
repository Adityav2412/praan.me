'use client';

export default function AnnouncementTicker() {
  const items = [
    "Save Birds 🐦",
    "Water For Wings 💧",
    "Water For Birds 🌿",
    "#DelhiBirdsNeedWater",
    "Place a water station today",
    "Every drop counts 💙"
  ];

  // Double the items for seamless loop
  const tickerContent = [...items, ...items];

  return (
    <div className="bg-navy text-cream-dark py-2 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {tickerContent.map((item, index) => (
          <span key={index} className="mx-8 text-sm font-medium">
            {item}
            <span className="mx-4 opacity-50">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
