import { useState, useCallback } from "react";
import { Card, Page, Layout, TextField, TextContainer, Heading, Button } from "@shopify/polaris";
import { EditMinor } from '@shopify/polaris-icons';
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useLocation } from 'react-router-dom';
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";

export default function EditShortcode() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = location.search.replace('?key=', '')

  const {
    data,
    refetch: refetchShortcodeCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/shortcode/get",
    fetchInit: {
      headers: {
        asset: currentRoute
      }
    },
    reactQueryOptions: {
      onSuccess: (res) => {
        setIsLoading(false);
      },
    },
  });

  const currentShortcode = () => {
    return data && data.data && data.data[0] || false
  }

  const updateShortcode = async () => {
    // const response = await fetch("/api/shortcodes/update", {
      // headers: {
      //   asset: currentShortcode().id,
      //   value: currentShortcode().value
      // }
    // })

    // if (response.ok) {
    //   setToastProps({ content: "Shortcodes Created!" });
    // } else {
    //   setIsLoading(false);
    //   setToastProps({
    //     content: "There was an error creating shortcodes",
    //     error: true,
    //   });
    // }
  }

  return (
    <Page>
      <TitleBar
        title="Edit Shortcode"
        primaryAction={{
          content: "Save Shortcode",
          onAction: () => updateShortcode(),
        }}
        secondaryActions={[
          {
            content: "Back To Shortcodes",
            onAction: () => navigate('/shortcodes'),
          },
        ]}
      />
        {currentShortcode() ? (
           <TextField
            label={`Edit ${currentShortcode().key}`}
            value={currentShortcode().value}
            onChange={() => {}}
            multiline={4}
            autoComplete="off"
          />
        ) : (
          <p>Loading...</p>
        )}
    </Page>
  );
}
