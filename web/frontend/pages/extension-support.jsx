import { 
  Banner, 
  Button, 
  Card, 
  Grid,
  Collapsible, 
  Page, 
  TextContainer, 
  TextStyle,
  Layout, 
  Icon,
  Heading, 
  ResourceList, 
  ResourceItem, 
} from "@shopify/polaris";
import {
  ChevronDownMinor,
  ChevronRightMinor
} from '@shopify/polaris-icons';
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import {useState, useCallback} from 'react';

export default function Support() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/')
  }

  const FAQs = [
    {
      question: 'I have an OS1 theme! Is there anything I can do?',
      answer: 'We have a custom integration that requires us to access your theme and install it manually. Please <a href="https://electriceye.io/page/contact/" target="_blank">contact support</a> and we will happily assist you with this, and more!'
    },
    {
      question: 'I can\'t seem to find the content section in my theme, what now?',
      answer: 'Ensure you have followed the onboarding guide first; then <a href="https://electriceye.io/page/contact/" target="_blank">contact support</a>!'
    },
    {
      question: 'You don\'t seem to have the section I want!',
      answer: 'As this is still a beta app, we\'re taking any and all suggestions for shortcodes! <a href="https://electriceye.io/page/contact/" target="_blank">Fill out or support form</a>, and we will get right on it! Thanks in advance for your help making this the best app it can be!'
    },
    {
      question: 'I love this app! How can I help?',
      answer: 'Whether you\'ve got an idea for the app, or are a developer that would like to contribute, we welcome you with open arms! Get started by checking out our <a href="https://github.com/electric-mike/shopify-app" target="_blank">github repo</a>, or <a href="mailto:mike@electriceye.io">shoot Mike an email directly!</a>'
    },
  ]

  const [faqs, setFaqs] = useState(new Array(FAQs.length).fill(false));
  const toggleFaq = (faqIndex) => {
    const newFaqs = [...faqs];
    newFaqs[faqIndex] = !newFaqs[faqIndex];
    setFaqs(newFaqs);
  };

  return (
    <Page>
      <TitleBar
        title="Extension Support"
        primaryAction={{
          content: "Contact Support",
          url: 'https://electriceye.io/page/contact/'
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
        <Layout.Section>
          <Card sectioned>
            <Heading element="h1">FAQs</Heading>
            <br />
            <ResourceList
              resourceName={{singular: 'Shortcode', plural: 'Shortcodes'}}
              items={FAQs}
              renderItem={(item, id) => {
                const { question, answer } = item;

                return (
                  <ResourceItem
                    key={id}
                    id={id}
                    accessibilityLabel={question}
                    onClick={() => toggleFaq(id)}
                  >
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 10, sm: 10, md: 10, lg: 10, xl: 10 }}>
                        <Heading>{question}</Heading>
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
                        <div style={{
                          width: '20px',
                          marginLeft: 'auto',
                          marginRight: '0'
                        }}>
                          <Icon
                            source={faqs[id] ? ChevronDownMinor : ChevronRightMinor}
                            color="base"
                          />
                        </div>
                      </Grid.Cell>
                    </Grid>

                    <Collapsible
                      open={faqs[id]}
                      id="basic-collapsible"
                      transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
                      expandOnPrint
                    >
                      <TextContainer>
                        <p dangerouslySetInnerHTML={{__html: answer }}></p>
                      </TextContainer>
                    </Collapsible>
                  </ResourceItem>
                );
              }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
