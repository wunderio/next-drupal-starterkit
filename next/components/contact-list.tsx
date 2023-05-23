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
    image: "/John_Doe.jpg",
    name: "John Doe",
    title: "CFO",
    phoneNumber: "+358445123456",
    email: "john.doe@mail.com",
    id: 1,
  },
  {
    image: "/Jane_Doe.jpg",
    name: "Jane Doe",
    title: "CEO",
    phoneNumber: "+358445123457",
    email: "jane.doe@mail.com",
    id: 2,
  },
  {
    image: "/Charlie_Doe.jpg",
    name: "Charlie Doe",
    title: "CTO",
    phoneNumber: "+358445123458",
    email: "charlie.doe@mail.com",
    id: 3,
  },
];

export function ContactList() {
  const { t } = useTranslation();
  return (
    <section id="contacts-section" className="pb-8 pt-8">
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        {t("contacts")}
      </h2>
      <ul className="flex flex-wrap justify-around p-4">
        {contacts?.map((contact) => (
          <li key={contact.id} className="flex flex-col items-center p-4">
            <div className="h-18 w-18 mb-6 flex items-center justify-center">
              <NextImage
                src={contact.image}
                width={80}
                height={80}
                alt={`Portrait of ${contact.name}`}
                className="circle-clip"
              />
            </div>
            <p className="font-bold">{contact.name}</p>
            <p className="">{contact.title}</p>
            <p className="">{contact.phoneNumber}</p>
            <a
              href={`mailto:${contact.email}`}
              target="_blank"
              rel="noreferrer"
              className="hyperlink underline hover:no-underline"
            >
              {contact.email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
