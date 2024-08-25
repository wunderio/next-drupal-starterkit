import NextImage from "next/image";
import { getTranslations } from "next-intl/server";

interface Contact {
  image: string;
  name: string;
  title: string;
  phoneNumber: string;
  email: string;
  id: number;
}

const contacts: Contact[] = [
  {
    image: "/john_dean.jpg",
    name: "John Dean",
    title: "CFO",
    phoneNumber: "+358445123456",
    email: "john.dean@example.com",
    id: 1,
  },
  {
    image: "/charlie_dean.jpg",
    name: "Charlie Dean",
    title: "CTO",
    phoneNumber: "+358445123458",
    email: "charlie.dean@example.com",
    id: 3,
  },
  {
    image: "/jane_dean.jpg",
    name: "Jane Dean",
    title: "CEO",
    phoneNumber: "+358445123457",
    email: "jane.dean@example.com",
    id: 2,
  },
];

export async function ContactList() {
  const t = await getTranslations();
  return (
    <section className="py-8">
      <h2 className="font-bold text-heading-sm md:text-heading-md">
        {t("contact")}
      </h2>
      <ul className="grid grid-cols-1 gap-4 py-4 auto-rows-max justify-items-center sm:grid-cols-2 md:grid-cols-3">
        {contacts?.map(({ id, image, name, title, phoneNumber, email }) => (
          <li key={id} className="grid p-4 justify-items-center">
            <div className="mb-6 flex h-[100px] items-center justify-center overflow-hidden">
              <NextImage
                src={image}
                width={100}
                height={100}
                alt={t("image-of", { name })}
                className="circle-clip"
              />
            </div>
            <p className="font-bold">{name}</p>
            <p>{title}</p>
            <a
              href={`tel:${phoneNumber}`}
              target="_blank"
              rel="noreferrer"
              className="no-underline hyperlink hover:underline"
            >
              {phoneNumber}
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noreferrer"
              className="no-underline hyperlink hover:underline"
            >
              {email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
