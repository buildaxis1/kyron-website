import Image from "next/image";
import Link from "next/link";

const RelatedPost = ({
  image,
  slug,
  title,
  date,
}: {
  image: string;
  slug: string;
  title: string;
  date: string;
}) => {
  return (
    <div className="flex items-center lg:block xl:flex" data-oid="1ih69yb">
      <div className="mr-5 lg:mb-3 xl:mb-0" data-oid="zv0lt20">
        <div
          className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]"
          data-oid="d9fnglk"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 70px, (max-width: 1024px) 85px, 85px"
            data-oid="i3r0au7"
          />
        </div>
      </div>
      <div className="w-full" data-oid="ltln5cy">
        <h5 data-oid="811v.p:">
          <Link
            href={slug}
            className="mb-[6px] block text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary"
            data-oid="ydn347w"
          >
            {title}
          </Link>
        </h5>
        <p className="text-xs font-medium text-body-color" data-oid="wyr_w0m">
          {date}
        </p>
      </div>
    </div>
  );
};

export default RelatedPost;
