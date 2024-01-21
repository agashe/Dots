import { ContentLayout } from '../components/ContentLayout';

export function Contact() {
  let content = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent et neque lectus. Suspendisse venenatis imperdiet lobortis.
    Duis euismod neque ac convallis molestie.
    <br />
    <br />
  `;

  return <ContentLayout title='Contact' content={content} />;
}