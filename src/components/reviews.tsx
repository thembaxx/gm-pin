import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import star_icon from "@/assets/icons/star-fill.svg";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import clsx from "clsx";

interface Props {
  reviews: google.maps.places.PlaceReview[];
}

function getIntials(str: string) {
  const arr = str.split(" ");
  return arr.length === 1 ? arr[0][0] : arr[0][0] + arr[1][0];
}

interface ReviewProps {
  children: ReactNode;
  reviews: google.maps.places.PlaceReview[];
}

function Review({
  r,
  truncate,
}: {
  r: google.maps.places.PlaceReview;
  truncate: boolean;
}) {
  return (
    <div>
      <div className="flex items-center mb-3 space-x-2">
        <Avatar>
          <AvatarImage src={r.profile_photo_url} />
          <AvatarFallback className="text-[11px]">
            {getIntials(r.author_name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-xs">
          <p className="font-medium">{r.author_name}</p>
          <div className="flex items-center">
            <img
              src={star_icon}
              alt=""
              height={12}
              width={12}
              className="mr-1"
            />

            <p className="font-mono">{r.rating}</p>
          </div>
        </div>
      </div>
      <p
        className={clsx(
          "text-[13px] text-white/80",
          truncate ? "line-clamp-3" : "line-clamp-none"
        )}
      >
        {r.text}
      </p>
      <span className="font-mono text-xs text-neutral-500">
        {r.relative_time_description}
      </span>
    </div>
  );
}

function ReviewPopup({ children, reviews }: ReviewProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="bg-[#0a0a0a] overflow-hidden max-h-[80svh] border-neutral-800 dark">
          <DrawerHeader className="text-left">
            <DrawerTitle>Reviews</DrawerTitle>
            <DrawerDescription>{reviews.length} reviews</DrawerDescription>
          </DrawerHeader>
          <ul className="px-4 space-y-6 overflow-y-auto">
            {reviews.map((r, i) => (
              <li key={r.author_name + i}>
                <Review r={r} truncate={false} />
              </li>
            ))}
          </ul>
          <DrawerFooter>
            <DrawerClose className="w-full">
              <Button variant="outline" className="w-full">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="bg-[#0a0a0a] border-neutral-800 overflow-hidden dark py-8 flex flex-col px-0">
        <SheetHeader className="px-6">
          <SheetTitle>Reviews</SheetTitle>
          <SheetDescription>{reviews.length} reviews</SheetDescription>
        </SheetHeader>
        <ul className="flex-grow px-6 space-y-6 overflow-y-auto">
          {reviews.map((r, i) => (
            <li key={r.author_name + i}>
              <Review r={r} truncate={false} />
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}

function Reviews({ reviews }: Props) {
  return (
    <div>
      <ul className="space-y-4">
        {reviews.slice(0, 2).map((r, i) => (
          <li key={r.author_name + i}>
            <Review r={r} truncate={true} />
          </li>
        ))}
      </ul>
      {reviews.length > 2 && (
        <ReviewPopup reviews={reviews}>
          <Button size="sm" variant="secondary" className="mt-4">
            Sell all reviews ({reviews.length})
          </Button>
        </ReviewPopup>
      )}
    </div>
  );
}

export default Reviews;
