export function DriverBenefits() {
const items = [
{ title: "Flexible Hours", desc: "Work anytime that fits your schedule." },
{ title: "Weekly Earnings", desc: "Get paid weekly with transparent earnings breakdown." },
{ title: "Insurance & Support", desc: "You are protected on every trip with 24/7 support." },
{ title: "Vehicle Support Options", desc: "Fleet cars available if you don’t have one." },
{ title: "More Trips = Higher Earnings", desc: "Work peak hours for bonuses." },
];


return (
<section className="py-16 max-w-6xl mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-10">Why Drive with Us?</h2>
<div className="grid md:grid-cols-3 gap-8">
{items.map((b, i) => (
<div key={i} className="p-6 bg-card dark:bg-dark-card rounded-2xl shadow">
<h3 className="text-xl font-semibold mb-2">{b.title}</h3>
<p className="text-sm opacity-80">{b.desc}</p>
</div>
))}
</div>
</section>
);
}