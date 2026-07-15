import Resource from "../resource-type";
import resourcesData from "../data/resource-data";
import Pipeline from "./pipeline";

export default async function FullPageImageView(props: {
  resourceId: string;
  resourceType: string;
}) {
  if (!resourcesData || resourcesData.length === 0) {
    return;
  }

  const data: Resource | undefined = resourcesData.find(
    (resource) => resource.id === props.resourceId,
  );

  if (!data) {
    return <div data-oid="izythj4">Resource not found.</div>;
  }

  return (
    <section
      className="pb-[120px] pt-[120px] flex justify-center items-center"
      data-oid="i2o:nz0"
    >
      <div className="container" data-oid="rb2bn4k">
        <div
          className="w-8/12 rounded-[25px] bg-[#2EA84A] p-4 "
          data-oid="c4_xg:-"
        >
          <Pipeline data-oid="fbs5xah" />

          <div className="" data-oid="e0g9f_6">
            {/* Using Server actions we can favorite the position, send you back to the home page, and ensure the position is favorited on from the homepage all in one function. */}
            {/* <form
                              action={async () => {
                              "use server";
                               await deletePosition(data.id);
                              }}
                              >
                              <Button type="submit" variant={"default"}>
                              Favorite
                              </Button>
                              </form> */}
          </div>
        </div>
      </div>
    </section>
  );
}
