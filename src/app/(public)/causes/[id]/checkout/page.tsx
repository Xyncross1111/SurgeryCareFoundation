"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { LockIcon } from "@/components/ui/icons";

const AMOUNTS = [1000, 5000, 10000] as const;

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState("");

  const donationAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  return (
    <section className="py-8 md:py-12">
      <Container>
        <Link
          href={`/causes/${params.id}`}
          className="mb-2 inline-flex items-center gap-1 text-btn font-bold text-slate-medium transition-colors hover:text-primary"
        >
          <span aria-hidden="true">&larr;</span> Back to Cause
        </Link>
        <Heading level="h2" as="h1" className="mb-8">Secure Checkout</Heading>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
              {/* Amount Selection */}
              <fieldset className="mb-8">
                <legend className="mb-4 text-label uppercase text-slate-light">
                  Select Donation Amount
                </legend>
                <div className="mb-4 grid grid-cols-3 gap-3">
                  {AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                      className={cn(
                        "rounded-full border py-3 text-btn font-bold transition-colors",
                        selectedAmount === amt && !customAmount
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-surface-border text-primary hover:border-accent"
                      )}
                    >
                      &#8377; {formatINR(amt)}
                    </button>
                  ))}
                </div>
                <Input
                  placeholder="&#8377; Other Amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </fieldset>

              {/* Personal Details */}
              <Heading level="h4" as="h2" className="mb-4">Personal Details</Heading>
              <div className="mb-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email Address" />
              </div>

              {/* Payment */}
              <Heading level="h4" as="h2" className="mb-4">Payment Method</Heading>
              <div className="mb-4 flex gap-3" role="group" aria-label="Payment method">
                <button
                  type="button"
                  className="flex-1 rounded-full border border-accent bg-accent/10 py-3 text-btn font-bold text-accent"
                >
                  Card
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full border border-surface-border py-3 text-btn font-bold text-slate-medium"
                >
                  &middot;&middot;&middot;
                </button>
              </div>
              <div className="mb-6 space-y-4">
                <Input placeholder="0000 0000 0000 0000" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </div>
              </div>

              <Link href={`/causes/${params.id}/thank-you`}>
                <Button variant="primary" size="lg" className="w-full">
                  Complete Donation of &#8377;{formatINR(donationAmount)}
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-slate-light">
                <LockIcon className="size-4" />
                <Text as="span" variant="muted" size="label" className="normal-case tracking-normal">
                  256-bit Secure Encryption
                </Text>
              </div>
            </div>
          </div>

          {/* Right — Summary */}
          <aside className="lg:col-span-2">
            <div className="sticky top-32 rounded-2xl border border-surface-border bg-white p-6 shadow-card">
              <Heading level="h4" as="h2" className="mb-4">Donation Summary</Heading>

              <div className="mb-6 flex items-center gap-3 border-b border-surface-border pb-6">
                <Avatar initials="SV" size="lg" />
                <div>
                  <Text variant="muted" size="label" className="normal-case tracking-normal">
                    Supporting
                  </Text>
                  <p className="text-btn font-black text-primary">Samarth Verma</p>
                  <Text variant="muted" size="label" className="normal-case tracking-normal">
                    Brain Tumor
                  </Text>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text variant="secondary">Donation Amount</Text>
                  <Text className="font-bold">
                    &#8377; {formatINR(donationAmount)}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="secondary">Platform Fee (0%)</Text>
                  <Text className="font-bold">&#8377; 0</Text>
                </div>
                <div className="flex justify-between border-t border-surface-border pt-3">
                  <p className="text-btn-lg font-black text-primary">Total</p>
                  <p className="text-btn-lg font-black text-accent">
                    &#8377; {formatINR(donationAmount)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
