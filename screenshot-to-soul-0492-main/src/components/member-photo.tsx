import profile from "@/assets/member-profile.jpg";

/** One image and crop shared by the compact card and its detail view. */
export function MemberPhoto() {
  return (
    <img
      src={profile}
      alt="Fictional illustrated member profile"
      width={1024}
      height={1024}
      className="h-full w-full object-cover object-center"
    />
  );
}