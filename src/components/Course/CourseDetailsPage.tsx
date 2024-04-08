import React, { useEffect, useState } from "react";
import { useGetCourseDetailsQuery } from "../../../redux/features/courses/coursesApi";
import Loader from "../ui/Loader/Loader";
import Heading from "../../utils/Heading";
import Header from "../Header";
import CourseDetails from "../../components/Course/CourseDetails";
import { useCreatePaymentIntentMutation, useGetStripePublishKeyQuery } from "../../../redux/features/order/orderApi";
import { loadStripe } from '@stripe/stripe-js';


type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishKeyQuery({});
  const [createPaymentIntent, {data:paymentIntentData}] = useCreatePaymentIntentMutation()
  const [stripePromise, setStripePromise] = useState<any>(null)
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if(config){
      const publishKey = config.publishKey
      setStripePromise(loadStripe(publishKey));
    }
    if(data){
      const amount = Math.round(data.course.price * 100)
      createPaymentIntent(amount);
    }
  }, [config, data])
 
  useEffect(() => {
    if(paymentIntentData){
      setClientSecret(paymentIntentData?.clientSecret)
    }
  }, [paymentIntentData])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            description="Eduwise is a platform for students to learn and get help from teachers"
            keywords="Programming,MERN,Redux,Next,Microservice"
            title={data?.name + " - Eduwise"}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {
            stripePromise && (
              <CourseDetails data={data} stripePromise={stripePromise} clientSecret={clientSecret} />
            )
          }
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
