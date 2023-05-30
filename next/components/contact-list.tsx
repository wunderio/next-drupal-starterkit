import NextImage from "next/image";
import { useTranslation } from "next-i18next";

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

export function ContactList() {
  const { t } = useTranslation();
  return (
    <section className="py-8">
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {t("contact")}
      </h2>
      <ul className="grid auto-rows-max grid-cols-1 justify-items-center gap-4 py-4 sm:grid-cols-2 md:grid-cols-3">
        {contacts?.map(({ id, image, name, title, phoneNumber, email }) => (
          <li key={id} className="grid justify-items-center p-4">
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
              className="hyperlink no-underline hover:underline"
            >
              {phoneNumber}
            </a>
            <a
              href={`mailto:${email}`}
              target="_blank"
              rel="noreferrer"
              className="hyperlink no-underline hover:underline"
            >
              {email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
