
import Jumbotron from "@/Components/Main/Fragments/Section/Jumbotron";
import Header from "@/Components/Main/Fragments/Section/Header";
import MainLayout from "@/Layouts/MainLayout";
import LastSection from "@/Components/Main/Fragments/Section/LastSection";

export default function Homepage() {


    return (

        <div>
            <MainLayout>
                <Header/>
                <Jumbotron />
                <LastSection/>
            </MainLayout>
        </div>
    );
}
