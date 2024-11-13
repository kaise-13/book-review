export const PicturePreview = (props) => {
    return (
        <>
          {props.iconUrl && <img src={props.iconUrl} alt="プレビュー" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />}
        </>
    )
}