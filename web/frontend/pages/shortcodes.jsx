import { useState, useCallback } from "react";
import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function Shortcodes() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  
  const {
    data,
    refetch: refetchShortcodeCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/shortcodes/get",
    reactQueryOptions: {
      onSuccess: (res) => {
        setIsLoading(false);
      },
    },
  });

  const shortcodes = () => {
    return data && data.data || false
  }

  return (
    <Page>
      <TitleBar
        title="Shortcodes"
        // primaryAction={{
        //   content: "Primary action",
        //   onAction: () => console.log("Primary action"),
        // }}
        // secondaryActions={[
        //   {
        //     content: "Secondary action",
        //     onAction: () => console.log("Secondary action"),
        //   },
        // ]}
      />
        {shortcodes().length > 0 ? (
          <Layout>
            <Layout.Section>
              {shortcodes().map((code) => (
                <Card sectioned>
                  <Heading>{code.key}</Heading>
                  <TextContainer>
                    <p>{code.created}</p>
                  </TextContainer>
                </Card>
              ))}
            </Layout.Section>
            <Layout.Section secondary>
              <Card sectioned>
                Total Shortcodes: {shortcodes().length}
              </Card>
            </Layout.Section>
          </Layout>
        ) : (
          <Layout>
            <Layout.Section>
              <Card sectioned>
                {isLoadingCount ? (<p>Loading</p>) : (<p>No shortcodes found; please install them!</p>)}
              </Card>
            </Layout.Section>
          </Layout>
        )}
    </Page>
  );
}
