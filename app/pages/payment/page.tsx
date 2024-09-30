import { Suspense } from "react";
import PaymentComponents from "./payment-components";

export default function Payment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentComponents />
    </Suspense>
  )
}