export default function Requirements() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">Requirements</h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div>
          <h3 className="font-semibold text-lg mb-4">Driver Requirements</h3>
          <ul className="text-muted dark:text-dark-muted space-y-2">
            <li>• Valid driver’s license</li>
            <li>• Verified ID</li>
            <li>• Clean driving record</li>
            <li>• Reliable & professional</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">Vehicle Requirements</h3>
          <ul className="text-muted dark:text-dark-muted space-y-2">
            <li>• Valid papers</li>
            <li>• Model year meets requirement</li>
            <li>• Clean interior & exterior</li>
            <li>• AC working + good tires</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
