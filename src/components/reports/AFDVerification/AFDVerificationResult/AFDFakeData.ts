export const data = {
  status: 'completed',
  config: {
    primitive_name: 'afd_verification',
    config: {
      algo_name: 'fdverifier',
      lhs_indices: [0],
      rhs_indices: [1],
      is_null_equal_null: false,
    },
  },
  result: {
    primitive_name: 'afd_verification',
    result: {
      error: 0.19047619047619047,
      num_error_clusters: 3,
      num_error_rows: 7,
      clusters: [
        {
          num_distinct_rhs_values: 2,
          most_frequent_rhs_value_proportion: 0.6666666666666666,
          rows: [
            ['Elf', '6', 'True'],
            ['Elf', '6', 'True'],
            ['Elf', '1', 'True'],
          ],
        },
        {
          num_distinct_rhs_values: 2,
          most_frequent_rhs_value_proportion: 0.5,
          rows: [
            ['Ogre', '9', 'False'],
            ['Ogre', '6', 'False'],
          ],
        },
        {
          num_distinct_rhs_values: 2,
          most_frequent_rhs_value_proportion: 0.5,
          rows: [
            ['Dwarf', '9', 'False'],
            ['Dwarf', '6', 'False'],
          ],
        },
      ],
      table_header: ['Creature', 'Strength', 'HaveMagic'],
    },
  },
  initiator_id: null,
  id: '5e12f329-52f4-4463-845b-a9ec353c49ae',
};
