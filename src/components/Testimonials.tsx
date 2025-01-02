export const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have simplified their healthcare journey
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Happy User</h4>
                  <p className="text-gray-600 text-sm">Patient</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Healplix has made it so much easier to manage my healthcare appointments. The platform is intuitive and saves me so much time!"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};