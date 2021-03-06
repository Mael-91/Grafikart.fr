import {useState} from 'preact/hooks'
import {FetchForm, FormField, FormPrimaryButton} from '@comp/Form'
import {Fragment} from 'preact'
import {useToggle} from '@fn/hooks'
import {Alert} from '@comp/Alert'
import {Modal} from '@comp/Modal'

function ReportButton ({children, ...props}) {
  return <button className="forum-message__report js-report" {...props}>
    <span>!</span>
    {children}
  </button>
}

function ReportForm ({action, value, onChange, onSuccess}) {
  const placeholder = "Indiquez en quoi ce sujet ne convient pas"
  return <FetchForm value={value} onChange={onChange} className="stack modal-box p2" action={action} method="post" onSuccess={onSuccess}>
    <FormField type="textarea" name="reason" required placeholder={placeholder} autofocus>Raison du signalement</FormField>
    <FormPrimaryButton>Envoyer</FormPrimaryButton>
  </FetchForm>
}

export function Report ({message}) {
  const endpoint = '/api/reports'
  let instructions = 'Signaler le sujet'
  const initialData = {
    reason: ''
  }
  if (message) {
    initialData.message = `/api/forum/messages/${message}`
    instructions = 'Signaler le message'
  }
  const [formVisible, toggleForm] = useToggle(false)
  const [success, setSuccess] = useState(false)
  const [value, onChange] = useState(initialData)

  return <Fragment>
    {!success && <div className="forum-message__actions">
      <ReportButton style={{marginLeft: 'auto'}} onClick={toggleForm}>{instructions}</ReportButton>
    </div>}
    {success && <Alert type="success" duration={2500}>Merci pour votre signalement</Alert>}
    {formVisible && !success && <Modal onClose={toggleForm}>
      <ReportForm value={value} action={endpoint} onSuccess={setSuccess} onChange={onChange}></ReportForm>
    </Modal>}
  </Fragment>
}
