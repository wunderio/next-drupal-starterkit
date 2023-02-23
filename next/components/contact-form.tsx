// TODO: Add translations.

export function ContactForm() {
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch(`/api/contact`, {
      method: "POST",
      body: JSON.stringify({
        name: event.target.name.value,
        email: event.target.email.value,
        message: event.target.message.value,
        subject: event.target.subject.value,
      }),
    });

    if (response.ok) {
      // TODO: show some visible feedback?
      alert("Thanks!");
    }

    // TODO: Handle error.
  }

  return (
    <form
      // TODO: why is this a problem?
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-5 rounded border bg-white p-4 shadow-md transition-all hover:shadow-md"
    >
      <h2 className="text-heading-sm font-bold md:text-heading-md">
        Simple webform
      </h2>
      <p>
        This form is posting to the default contact webform in Drupal. Try it!
      </p>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="name">
          Name:
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3  shadow "
          type="text"
          id="name"
          name="name"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="email">
          Email:
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 shadow"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="subject">
          Subject:
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 shadow"
          type="text"
          id="subject"
          name="subject"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-bold" htmlFor="message">
          Message:
        </label>
        <textarea
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 shadow"
          id="message"
          name="message"
          required
        />
      </div>

      <button
        className="focus:shadow-outline rounded bg-wunderpurple-500 py-2 px-4 font-bold text-white hover:bg-wunderpurple-700"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
