import { Badge, Banner, Card, Page, Layout, TextContainer, Heading, MediaCard } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { beforeImage, afterImage } from "../assets";

const SHORTCODES = [
  {
    id: 1,
    name: 'Youtube',
    parameters: 'src',
    example: '[youtube src="YOUTUBE_KEY"]'
  },
  {
    id: 2,
    name: 'Product',
    parameters: 'handle',
    example: '[product handle="PRODUCT_HANDLE"]'
  },
  {
    id: 3,
    name: 'Product + Add To Cart',
    parameters: 'handle',
    example: '[product-atc handle="PRODUCT_HANDLE"]'
  }
]

export default function ExtensionOnboarding() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/')
  }

  const viewSupport = () => {
    navigate('/extension-support');
  }

  return (
    <Page>
      <TitleBar
        title="Extension Onboarding"
        primaryAction={{
          content: "Support",
          onAction: viewSupport,
        }}
        secondaryActions={[
          {
            content: "Back Home",
            onAction: goHome,
          },
        ]}
      />
      <Layout>
        {/* @TODO make function that checks if theme is OS2? */}
        <Layout.Section>
          <Banner
            title="We Only Support OS2 Themes"
            status="info"
            action={{
              content: "Contact Support",
              url: 'https://electriceye.io/page/contact/'
            }}
          >
            <p>This app only supports OS2 themes by default. Contact us if you have an OS1 theme and would like this functionality.</p>
          </Banner>
        </Layout.Section>
        <Layout.Section twoThirds>
          <Card sectioned>
            <Heading element="h1">Onboarding Guide</Heading>
            <br />
            <TextContainer>
              <p>You now have access to our Shortcodes theme section!</p>
              <p>Our section works on any OS2 theme, and is intended to replace the "content" on Blog Posts and Product Pages.</p>
              <Badge progress="incomplete" status="warning">Pages are still a work in progress!</Badge>
              <p>Within Shopify's Customize view, you simply <strong>hide</strong> your normal content block, and <strong>add</strong> ours below it.</p>
              <p>
                You can then use our suite of shortocdes directly within Shopify's Content Editor.
                Simply pass it the relevant data, and it will populate accordingly.
              </p>
              <p>Our extension runs during the Liquid render cycle, so you'll never see a flash of unstyled content, which is typical in many other applications in the Shopify ecosystem.</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <MediaCard
            title="1. Add Out Shortcodes Section"
            description="Find the content section in your theme, and add our shortcodes section"
            portrait="true"
            sectioned
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={beforeImage}
            />
          </MediaCard>
        </Layout.Section>
        <Layout.Section oneHalf>
          <MediaCard
            title="2. Hide Your Old Content Section"
            description="Hide the old section, and voila! You have working shortcodes!  🎉"
            portrait="true"
          >
            <img
              alt=""
              width="100%"
              height="100%"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={afterImage}
            />
          </MediaCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
