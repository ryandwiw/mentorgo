import MainLayout from "@/Layouts/MainLayout";
import Banner from "@/Components/Main/Banner/Index";
import Companies from "@/Components/Main/Companies/Index";
import Courses from "@/Components/Main/Courses/Index";
import Mentor from "@/Components/Main/Mentor/Index";
import Newsletter from "@/Components/Main/Newsletter/Index";
import Testimonials from "@/Components/Main/Testimonials/Index";

export default function Homepage() {


    return (

        <div>
            <MainLayout>
               <Banner/>
               <Companies/>
               <Courses/>
               <Mentor/>
               <Testimonials/>
               <Newsletter/>
            </MainLayout>
        </div>
    );
}
