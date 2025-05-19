import toast from "react-hot-toast";

export class MissingAppProviderError extends Error {
  constructor(message = "") {
    super(
      `${
        message ? `${message} ` : message
      } Your application must be wrapped in an <AppProvider> component`
    );
    this.name = "MissingAppProviderError";
  }
}

export const toastErrorResponse = (e: any) => {
  if (e.response?.data?.message) {
    toast.error(`🙁 Sorry!, ${e.response.data.message}`);
  } else {
    toast.error(`🙁 Sorry!, ${e.message}`);
  }
};

export function getObjectError(error: Object | string) {
  if (typeof error === "string") return error;
  if (typeof error !== "object") return;

  let errorMessage = error
    ? Object.values(error)
        .map((e) => e.message)
        .join(", " || "")
    : null;

  return errorMessage;
}
