"use client";

import { useFormStatus } from "react-dom";

import Button from "@/app/components/ui/Button";
import Spinner from "@/app/components/ui/Spinner";

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  pendingLabel?: string;
};

/**
 * `useFormStatus` reads the status of an ANCESTOR <form>, so this has to be a
 * separate component nested inside the form — calling the hook in the component
 * that renders the <form> would always report false.
 */
const SubmitButton = ({ children, pendingLabel, disabled, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending && <Spinner />}
      {pending && pendingLabel ? pendingLabel : children}
    </Button>
  );
};

export default SubmitButton;
