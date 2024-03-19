import { styles } from '@/styles/style';
import React, { useState } from 'react'

type Props = {
  active:number;
  setActive: (active:number) => void;
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
}

const CourseInformation:React.FC<Props> = ({ active, setActive, courseInfo, setCourseInfo }) => {
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active);
  };
  return (
    <div className="w- [80%] m-auto mt-24">
      <form onSubmit={handleSubmit} className={`${styles.label}`}>
        <div>
          <label htmlFor="">Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Learn MERN stack"
            className={`${styles.input} `}
          />
        </div>
        <br />
        <div className="mb-3">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Description.."
            className={`${styles.input} !h-min py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label htmlFor="">Course Price</label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.price}
                onChange={(e: any) =>
                  setCourseInfo({ ...courseInfo, price: e.target.value })
                }
                id="price"
                placeholder="3999"
                className={`${styles.input} `}
              />
            </div>
            <div className="w-[45%]">
              <label htmlFor="">Estimated Price</label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.estimatedPrice}
                onChange={(e: any) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="estimatedPrice"
                placeholder="4999"
                className={`${styles.input} `}
              />
            </div>
          </div>
          <br />
          <div>
            <label className={`${styles.label}`} htmlFor="email">
              Course Tags{" "}
            </label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="MERN, Next 13, Socket io, tailwind css, LMS"
              className={`${styles.input}`}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CourseInformation