import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeadingParagraph } from "./heading--paragraph";

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
    image: "/profile.png",
    name: "John Dean",
    title: "CFO",
    phoneNumber: "+358123456789",
    email: "john.dean@example.com",
    id: 1,
  },
  {
    image: "/profile.png",
    name: "Charlie Dean",
    title: "CTO",
    phoneNumber: "+358123456789",
    email: "charlie.dean@example.com",
    id: 3,
  },
  {
    image: "/profile.png",
    name: "Jane Dean",
    title: "CEO",
    phoneNumber: "+358123456789",
    email: "jane.dean@example.com",
    id: 2,
  },
];

export async function ContactList() {
  const t = await getTranslations();
  return (
    <section className="py-8">
      <HeadingParagraph>{t("contact")}</HeadingParagraph>
      <ul className="grid grid-cols-1 gap-4 py-4 auto-rows-max justify-items-center sm:grid-cols-2 md:grid-cols-3">
        {contacts?.map(({ id, image, name, title, phoneNumber, email }) => (
          <li key={id} className="grid p-4 justify-items-center">
            <div className="mb-6 flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full">
              <Image
                src={image}
                width={100}
                height={100}
                alt={t("image-of", { name })}
                className="rounded-full"
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
