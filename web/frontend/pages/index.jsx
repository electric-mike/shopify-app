import {
  Badge,
  Banner,
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { trophyImage, ElectricEyeLogo } from "../assets";

export default function HomePage() {
  const navigate = useNavigate();

  const viewOnboarding = () => {
    navigate('/extension-onboarding');
  }

  return (
    <Page>
      <TitleBar 
        title="Welcome"
        primaryAction={{
          content: "Read Onboarding Guide",
          onAction: viewOnboarding,
        }}
        secondaryActions={[
          {
            content: "Contact Us",
            url: 'https://electriceye.io/page/contact/'
          }
        ]}
      />
      <Layout>
        {/* @TODO make function that checks if theme is OS2? */}
        <Layout.Section>
          <Banner
            title="We Only Support OS2 Themes"
            status="info"
            action={{
              content: "Contact Us",
              url: 'https://electriceye.io/page/contact/'
            }}
            secondaryAction={{ 
              content: 'Learn more',
              onAction: viewOnboarding
            }}
          >
            <p>This app only supports OS2 themes by default. Contact us if you have an OS1 theme and would like this functionality.</p>
          </Banner>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card 
            sectioned
            primaryFooterAction={{
              content: "Read Onboarding Guide",
              onAction: viewOnboarding
            }}
          >
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Thanks for installing our app! 🎉</Heading>
                  <p>Now that you've installed the app, you have access to our shortcodes, and can use them to replace existing OS2-based theme blocks.</p>
                  <p>To get started, view our onboarding guide!</p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Thanks for installing!"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card 
            sectioned
            primaryFooterAction={{
              content: "Contact Us",
              url: 'https://electriceye.io/page/contact/'
            }}
          >
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item>
                <div style={{ padding: "0 40px 0 0" }}>
                  <Image
                    source={ElectricEyeLogo}
                    alt="Electric Eye"
                    width={120}
                  />
                </div>
              </Stack.Item>
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Like what you see, but want more?</Heading>
                  <Badge progress="partiallyComplete" status="attention">
                    We are currently in beta
                  </Badge>
                  <p>This app is developed by Electric Eye, a boutique agency focused on helping brands grow their online sales. Apps are new to us, and we would love to hear your feedback!</p>
                  <p>If you see areas for improvement, feature requests, or want to work with us, reach out below!</p>
                </TextContainer>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
