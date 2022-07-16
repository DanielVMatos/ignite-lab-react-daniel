import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";
import "../styles/global.css"


const mockupURL = new URL('/src/assets/code-mockup.png', import.meta.url).href



export function Subscribe() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [createSubscriber, { loading }] = useCreateSubscriberMutation()

    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();
        await createSubscriber({
            variables: {
                name,
                email,
            }
        })

        navigate('/event');
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full lg1:max-w-[82vw] max-w-[70vw] flex md:flex-col md:mt-10  items-center justify-between mt-20 mx-auto">
                <div className="max-w-[40vw] md:max-w-none md:text-center">
                    <Logo />
                    <h1 className="mt-8 lg1:text-[2rem] text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React JS</strong>
                    </h1>

                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>

                </div>

                <div className="md:mt-8 sm1:w-[100vw] p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block ">Inscreva-se gratuitamente</strong>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text"
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />

                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email"
                            placeholder="Digite seu e-mail"
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-green-500 bold uppercase rounded py-4 text-sm hover:bg-green-700 transition-colors disabled:opacity-50">
                            Garantir minha vaga
                        </button>
                    </form>
                </div>

            </div>
            <img src={mockupURL} className="mt-10" alt="imagem do vscode com codigos" />

        </div>
    )
}