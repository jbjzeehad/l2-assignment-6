import image from "@/assets/img.jpg";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          About <span className="text-primary">PDSystem</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          This is a secure, modern parcel delivery system built to simplify
          logistics for Senders, Receivers, and Admins. Inspired by platforms
          like Pathao Courier and Sundarban, we provide a seamless, role-based
          dashboard experience — all powered by real-time API integration.
        </p>
      </section>

      <section className="rounded-xl bg-muted/50 px-8 py-16 text-center shadow-sm">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Transforming Parcel Delivery with Smart Logistics
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our platform simplifies the way parcels are sent, tracked, and
          received. Whether you're a small business or individual, you get a
          seamless, real-time experience backed by modern tech — with secure
          authentication and intelligent workflows bringing reliability to your
          doorstep.
        </p>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Our Mission
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          To revolutionize parcel delivery in emerging markets by making it
          accessible, trackable, and secure — empowering users with the tools to
          manage every delivery confidently. We aim to build a trusted platform
          that connects senders, receivers, and admins through transparency and
          efficiency.
        </p>
      </section>
      <section className="space-y-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Meet the Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            {
              name: "Rahim Ahmed",
              role: "Frontend Engineer",
              img: image,
            },
            {
              name: "Karim Ahmed",
              role: "Backend Architect",
              img: image,
            },
            {
              name: "Jamal Ahmed",
              role: "UX Designer",
              img: image,
            },
            {
              name: "Rubel Ahmed",
              role: "Product Manager",
              img: image,
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-background rounded-xl p-6 shadow-sm border text-center space-y-4"
            >
              <img
                src={member.img}
                alt={member.name}
                className="mx-auto h-24 w-24 rounded-full object-cover border shadow"
              />
              <div className="text-lg font-semibold">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.role}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-muted/50 px-8 py-16 rounded-xl text-center shadow-sm">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
          Why Choose PDSystem ?
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Whether you're a small business, a regular sender, or managing a
          logistics operation — PDSystemParcel gives you the control,
          visibility, and reliability you need to streamline deliveries and
          ensure parcels reach their destination safely and efficiently.
        </p>
      </section>
    </div>
  );
}
