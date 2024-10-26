import { FC } from "react";
import { motion } from "framer-motion";

import style from './style.module.scss'
import { TransformGridItem } from "../TransformGridItem";
import { transforms } from "../Transforms/Transform";

export const TransformGrid: FC = () =>
  <ul className={style.grid}>
    {transforms.map((v, i) =>
      <motion.li
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 + 1.5 }} >

        <TransformGridItem
          transform={v}/>

      </motion.li>
    )}
  </ul>
