import { useState, useCallback } from "react";
import {
  Card,
  Heading,
  TextContainer,
  TextField,
  DisplayText,
  TextStyle,
} from "@shopify/polaris";
import { Toast, useNavigate } from '@shopify/app-bridge-react';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";


export function ShortcodesCard() {
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

  const createShortcodes = async () => {
    const response = await fetch("/api/shortcodes/create")

    if (response.ok) {
      await refetchShortcodeCount();
      setToastProps({ content: "Shortcodes Created!" });
    } else {
      setIsLoading(false);
      setToastProps({
        content: "There was an error creating shortcodes",
        error: true,
      });
    }
  }

  const viewShortcodes = () => {
    navigate('/shortcodes');
  }

  const shortcodes = () => {
    return data && data.data || false
  }

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  return (
    <>
      {toastMarkup}
      <Card
        title="Shortcodes"
        sectioned
        primaryFooterAction={{
          content: shortcodes().length > 0 ? "View Shortcodes" : "Install Shortcodes",
          onAction: shortcodes().length > 0 ? viewShortcodes : createShortcodes,
          loading: isLoadingCount,
        }}
      >
        {shortcodes().length > 0 ? (
          <p>Shortcodes Installed, view and modify them!</p>
        ) : (
          <p>Shortcodes not installed yet! Install them now to get started!</p>
        )}
      </Card>
    </>
  );
}

