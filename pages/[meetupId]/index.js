import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://nasirebus:7FEfzXKB8ZbuPcPH@cluster0.jiceikd.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://nasirebus:7FEfzXKB8ZbuPcPH@cluster0.jiceikd.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
};

// export const getServerSideProps = async (context) => {
//   const meetupId = context.params.meetupId;

//   console.log(meetupId);

//   return {
//     props: {
//       meetupData: {
//         image:
//           "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Netflix-avatar.png/600px-Netflix-avatar.png",
//         id: meetupId,
//         title: "This is a first meetup",
//         address: "Some address 5, 12345 Some City",
//         desc: "This is a first meetup",
//       },
//     },
//   };
// };

export default MeetupDetails;
