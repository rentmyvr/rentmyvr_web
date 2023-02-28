import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Button, Stack } from '@mui/material';

// third-party
import { useDropzone } from 'react-dropzone';

// project import
import RejectionFiles from './RejectionFiles';
import PlaceholderContent from './PlaceholderContent';
import FilesPreview from './FilesPreview';

// const ACCEPTED = 'image/gif, image/png, image/jpeg';
const ACCEPTED = 'image/*';

const DropzoneWrapper = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.secondary.main}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' }
}));

// ==============================|| UPLOAD - MULTIPLE FILE ||============================== //

const MultiFileUpload = ({
  error,
  showList = false,
  files,
  type,
  setFieldValue,
  sx,
  onUpload,
  fieldName = 'files',
  multiple = true,
  disabled = false,
  accepted = ACCEPTED
}) => {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple: multiple,
    onDrop: (acceptedFiles) => {
      // console.log('acceptedFiles');
      // console.log(acceptedFiles);
      // console.log(files);

      if (files && multiple) {
        setFieldValue(fieldName, [...files, ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))]);
      } else {
        // if (multiple) {
        setFieldValue(
          fieldName,
          acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
        );
        // } else {
        //   setFieldValue(fieldName, Object.assign(acceptedFiles[0], { preview: URL.createObjectURL(acceptedFiles[0]) }));
        // }
      }
    }
  });

  const inputProps = { ...getInputProps(), accept: accepted, disabled };

  const onRemoveAll = () => {
    setFieldValue(fieldName, null);
  };

  const onRemove = (file) => {
    const filteredItems = files && files.filter((_file) => _file !== file);
    setFieldValue(fieldName, filteredItems);
    console.log('  ...Remove()');
  };

  const showPreview = (file) => {
    console.log(file);
    console.log(' ...showPreview()');
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          ...(type === 'STANDARD' && { width: 'auto', display: 'flex' }),
          ...sx
        }}
      >
        <Stack {...(type === 'STANDARD' && { alignItems: 'center' })}>
          <DropzoneWrapper
            {...getRootProps()}
            sx={{
              ...(type === 'STANDARD' && { p: 0, m: 1, width: 64, height: 64 }),
              ...(isDragActive && { opacity: 0.72 }),
              ...((isDragReject || error) && { color: 'error.main', borderColor: 'error.light', bgcolor: 'error.lighter' })
            }}
          >
            <input {...inputProps} />
            {/* <input {...getInputProps()} /> */}
            <PlaceholderContent type={type} />
          </DropzoneWrapper>
          {type === 'STANDARD' && files && files.length > 1 && (
            <Button variant="contained" color="error" size="extraSmall" onClick={onRemoveAll}>
              Remove all
            </Button>
          )}
        </Stack>
        {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
        {files && files.length > 0 && (
          <FilesPreview files={files} showList={showList} onRemove={onRemove} type={type} showPreview={showPreview} />
        )}
      </Box>
      {type !== 'STANDARD' && files && files.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ mt: 1.5 }}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )}
    </>
  );
};

MultiFileUpload.propTypes = {
  error: PropTypes.bool,
  showList: PropTypes.bool,
  files: PropTypes.array,
  setFieldValue: PropTypes.func,
  onUpload: PropTypes.func,
  sx: PropTypes.object,
  type: PropTypes.string,
  fieldName: PropTypes.string,
  accepted: PropTypes.string,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool
};

export default MultiFileUpload;
