export const PicturePreview = ({ iconUrl }) => {
    return (
        <>
          {iconUrl && <img src={iconUrl} alt="プレビュー" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />}
        </>
    )
}