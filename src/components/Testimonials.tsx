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
          {[
            { 
              name: "Mr Ravi", 
              initial: "R",
              description: "The online consultation feature saved me so much time. The doctors are very professional and the platform is easy to use!"
            },
            { 
              name: "Mrs Jyothi", 
              initial: "J",
              description: "Managing my family's health records and appointments has never been easier. The reminders feature is particularly helpful."
            },
            { 
              name: "Mr Kiran", 
              initial: "K",
              description: "I appreciate how quickly I can schedule appointments and get medical advice. The service is truly exceptional!"
            }
          ].map((user, index) => (
            <div key={index} className="feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {user.initial}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-gray-600 text-sm">Subscriber</p>
                </div>
              </div>
              <p className="text-gray-600">
                "{user.description}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};