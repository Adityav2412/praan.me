'use client';

export default function WhyItMatters() {
  const cards = [
    {
      icon: '🌡️',
      title: '45°C Heat',
      description:
        'Delhi summers are brutal. Birds struggle to find water as temperatures soar, leading to dehydration and death.',
    },
    {
      icon: '🏙️',
      title: 'Shrinking Water Sources',
      description:
        'Urbanization has dried up ponds and lakes. Natural water sources are disappearing, leaving birds with nowhere to drink.',
    },
    {
      icon: '💧',
      title: 'One Bowl Saves Many',
      description:
        'A single bowl of water can save dozens of birds daily. Your small action creates a ripple of life.',
    },
  ];

  return (
    <section id="why-it-matters" className="py-16 px-4 bg-cream">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-navy text-center mb-4">
          Why It Matters
        </h2>
        <p className="text-navy/70 text-center mb-12 max-w-2xl mx-auto">
          Understanding the crisis our feathered friends face
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-cream-dark rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <span className="text-6xl mb-4 block">{card.icon}</span>
              <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
              <p className="text-navy/70">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
