import TextInput from "@/components/auth/fields/TextInput";


export function ApplyForm() {
return (
<section className="py-20 px-4 max-w-3xl mx-auto" id="apply">
<h2 className="text-3xl font-bold mb-6 text-center">Apply to Become a Driver</h2>


<form className="space-y-6 bg-card dark:bg-dark-card p-8 rounded-2xl shadow">
<TextInput id="fullname" label="Full Name" placeholder="Enter your full name" />
<TextInput id="email" label="Email Address" type="email" placeholder="Enter your email" />
<TextInput id="phone" label="Phone Number" placeholder="0812 345 6789" />
<TextInput id="city" label="City" placeholder="Your current city" />
<TextInput id="vehicle" label="Vehicle Type" placeholder="Toyota Corolla, Honda, etc." />


<button
type="submit"
className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90"
>
Submit Application
</button>
</form>
</section>
);
}