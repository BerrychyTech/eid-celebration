import { FaUserCircle } from "react-icons/fa";


export function DriverTestimonials() {
const testimonials = [
{
name: "John Musa",
text: "BerryGo changed my life. I now earn steadily and work on my own schedule.",
},
{
name: "Amina Yusuf",
text: "The support team is fantastic. The platform is very driver-friendly.",
},
{
name: "Peter Adeoye",
text: "Weekly payments make it easy to plan my finances.",
},
];


return (
<section className="py-16 bg-muted/40 dark:bg-dark-muted/40 px-4">
<h2 className="text-3xl font-bold text-center mb-10">Driver Testimonials</h2>
<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
{testimonials.map((t, i) => (
<div
key={i}
className="p-6 bg-card dark:bg-dark-card rounded-2xl shadow flex flex-col items-center text-center"
>
<FaUserCircle className="text-6xl mb-4 text-primary" />
<p className="text-sm opacity-80 mb-3">“{t.text}”</p>
<h4 className="font-semibold">— {t.name}</h4>
</div>
))}
</div>
</section>
);
}