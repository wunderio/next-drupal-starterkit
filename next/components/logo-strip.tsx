import Image from "next/image";

interface Logo {
  image: string;
  label: string;
  id: string;
}

const logos: Logo[] = [
  {
    image: "/styles/icons/facebook.svg",
    label: "Share to Facebook",
    id: "facebook",
  },
  {
    image: "/styles/icons/linkedin.svg",
    label: "Share to Twitter",
    id: "twitter",
  },
  {
    image: "/styles/icons/twitter.svg",
    label: "Share to LinkedIn",
    id: "linkedIn",
  },
];

export function LogoStrip() {
  return (
    <section id="logo-section">
      <span className="sr-only">branding logos</span>
      <ul className="flex flex-wrap justify-center">
        {logos?.map((logo) => (
          <li key={logo.id} className="m-4">
            <Image
              src={logo.image}
              width={100}
              height={100}
              alt="branding logo"
              className="inline-block text-primary-600"
            />
            <span className="sr-only">{logo.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
