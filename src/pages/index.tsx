import { QuestionIcon, QuotesIcon } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

import {
  FEATURES,
  FREQUENTLY_ASKED_QUESTIONS,
  HOW_IT_WORKS,
  PRICING_PLANS,
} from "@/constants/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MOCK_REVIEWS } from "@/__mock__";
import { useInterval } from "@/hooks";
import { getInitials } from "@/lib";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Footer,
  Navbar,
  Pricing,
  SectionHeader,
  Seo,
} from "@/components/shared";

const Page = () => {
  const [current, setCurrent] = React.useState(0);

  useInterval(() => {
    setCurrent((prev) => (prev + 1) % MOCK_REVIEWS.length);
  }, 10000);

  const review = React.useMemo(() => {
    return MOCK_REVIEWS[current];
  }, [current]);

  return (
    <>
      <Seo title="Home" />
      <Navbar />
      <div className="w-screen">
        <div className="bg-grid h-screen w-full bg-cover bg-center bg-no-repeat py-10 lg:py-20">
          <div className="container mx-auto grid h-full place-items-center">
            <div className="flex h-full max-w-3/5 flex-1 flex-col items-center justify-center gap-y-5 text-center">
              <h1 className="text-8xl font-bold">
                Create a stunning portfolio that stands out in minutes
              </h1>
              <p className="text-xl text-gray-600">
                Build, customize and showcase your professional work with our intuitive portfolio
                builder. Perfect for creatives, developers and professionals looking to make an
                impact online.
              </p>
              <Button asChild size="lg">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div className="container mx-auto flex flex-col items-center gap-y-10 py-10 md:gap-y-20 md:py-20">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-primary-400 text-4xl font-semibold">What we offer</h3>
            <p className="font-medium">
              All the tools you need to craft a professional online presence
            </p>
          </div>
          <div className="grid w-full grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, subtitle, title }, index) => (
              <div className="space-y-4 rounded-md bg-white p-4" key={index}>
                <Icon className="text-primary-400 size-10" />
                <h4 className="text-lg font-medium">{title}</h4>
                <p className="text-sm">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="container mx-auto flex flex-col items-center gap-y-10 py-10 md:gap-y-20 md:py-20">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-primary-400 text-4xl font-semibold">
              Build your portfolio in minutes
            </h3>
            <p className="font-medium">Four simple steps to your perfect portfolio</p>
          </div>
          <div className="mt-10 grid w-full max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
            {HOW_IT_WORKS.map(({ description, step, title }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="bg-primary-100 text-primary-600 mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span className="text-2xl font-bold">{step}</span>
                </div>
                <h4 className="mb-2 text-xl font-semibold">{title}</h4>
                <p className="text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="container mx-auto flex flex-col items-center gap-y-10 py-10 md:gap-y-20 md:py-20">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-primary-400 text-4xl font-semibold">Pricing Plans</h3>
            <p className="font-medium">Choose the plan that fits your goals</p>
          </div>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
            {PRICING_PLANS.map((pricing, index) => (
              <Pricing key={index} pricing={pricing} />
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="bg-primary-400 w-full py-10 md:py-20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-background text-4xl font-semibold">Success Stories</h3>
            <p className="font-medium">Choose the plan that fits your goals</p>
          </div>
          <div className="relative min-h-[400px]">
            <QuotesIcon className="text-background absolute top-0 left-0 size-40 rotate-180" />
            <QuotesIcon className="text-background absolute right-0 bottom-0 size-40" />
            <div className="mx-auto flex max-w-3/5 flex-col items-center gap-y-5 py-20 text-center">
              <h3 className="text-4xl font-semibold">{review.comment}</h3>
              <div className="flex flex-col items-center gap-y-2">
                <Avatar className="size-16">
                  <AvatarImage src={review.user.image} alt={review.user.name} />
                  <AvatarFallback>{getInitials(review.user.name)}</AvatarFallback>
                </Avatar>
                <h5 className="text-2xl">{review.user.name}</h5>
                <p className="text-sm font-medium">{review.user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="container mx-auto grid grid-cols-1 gap-10 py-10 md:grid-cols-2 md:py-20">
        <div className="flex flex-col gap-y-5">
          <SectionHeader icon={QuestionIcon} title="FAQs" />
          <h3 className="text-primary-400 text-4xl font-semibold">Get answers to your questions</h3>
          <p className="font-medium">Get clarity on how our portfolio builder works</p>
        </div>
        <div className="">
          <Accordion single>
            {FREQUENTLY_ASKED_QUESTIONS.map((item, index) => (
              <AccordionItem id={`item-${index}`} key={index}>
                <AccordionTrigger id={`item-${index}`}>{item.question}</AccordionTrigger>
                <AccordionContent id={`item-${index}`}>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
