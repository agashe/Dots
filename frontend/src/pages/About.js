import { ContentLayout } from '../components/ContentLayout';

export function About() {
  let content = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    <br />

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
    <br />
    <br />

    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
  `;

  return <ContentLayout title='About' content={content} />;
}