import ProfileFooterBar from "../components/profile/ProfileFooterBar";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileOrdersAndAddress from "../components/profile/ProfileOrdersAndAddress";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileStatsGrid from "../components/profile/ProfileStatsGrid";
import ProfileTopBar from "../components/profile/ProfileTopBar";

export default function UserProfilePage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-white text-[#171717]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <ProfileTopBar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 pb-14 pt-4 sm:px-6 md:pb-16 lg:px-7 lg:pb-20 lg:pt-5">
        <section className="grid gap-5 md:grid-cols-[210px_minmax(0,1fr)] md:gap-6">
          <ProfileSidebar />

          <div className="space-y-5 md:space-y-6 lg:space-y-7">
            <ProfileHeader />
            <ProfileStatsGrid />
            <ProfileOrdersAndAddress />
          </div>
        </section>
      </main>

      <ProfileFooterBar />
    </div>
  );
}
