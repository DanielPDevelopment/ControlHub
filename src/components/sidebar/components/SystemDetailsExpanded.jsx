import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';

// os specific info keys
const ubuntuSpecs = [
  {
    name: 'OS',
    value: 'Description',
    expandable: false,
  },
  {
    name: 'CPU',
    value: 'Model name',
    expandable: true,
  },
  {
    name: 'Cores',
    value: 'CPU(s)',
    expandable: false,
  },
  {
    name: 'Architecture',
    value: 'Architecture',
    expandable: false,
  },
];

const SystemDetailsExpanded = ({ systemDetails }) => (
  <span className="mt-1 text-sm text-gray-400 text-left">
    {/* Ubunut Specs */}
    {ubuntuSpecs.map((item) => (
      <div key={item.name} className="">
        <span className="text-white">
          {item.name}
          :
          {' '}
        </span>
        {item.expandable ? (
          <Tooltip title={systemDetails?.[item.value]}>
            <span>{`${systemDetails?.[item.value].slice(0, 20 - 3)}...`}</span>
          </Tooltip>
        )
          : (
            <span>{systemDetails?.[item.value]}</span>

          )}
        <br />
      </div>
    ))}
  </span>
);

SystemDetailsExpanded.propTypes = {
  systemDetails: PropTypes.array.isRequired,
};

export default SystemDetailsExpanded;
