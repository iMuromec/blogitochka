import ServicePage from "@/components/ServicePage";

export default function VerifyRequestPage() {
  return (
    <ServicePage meta={{ title: "Ссылка для входа отправлена ​​на почту" }}>
      <div className="text-center p-6 border border-black rounded-md">
        <h1 className="text-3xl font-normal">
          Ссылка для входа отправлена ​​на почту
        </h1>
      </div>
    </ServicePage>
  );
}
