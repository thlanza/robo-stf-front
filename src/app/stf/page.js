"use client";

import { useState } from 'react';

// import { downloadPdf } from './utils/download';
import { ImDownload2 } from 'react-icons/im'
import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import LegendasModal from '@/components/legendasModal';


const formSchema = Yup.object({
    numero: Yup.string().required("Número da ação é requerido."),
    idAcao: Yup.string().required("Id da ação é requerida."),
  });
  

export default function stf() {
        const [erroDownload, configurarErroDownload] = useState(false);
        const [loading, configurarLoading] = useState(false);
        const [numeroInput, configurarNumero] = useState("");

        const [mostrarModal, configurarModal] = useState(false);
        const legendasArray = [
            "AC: Ação Cautelar",
            "ACO: Ação Cível Originária",
            "ACr: Apelação Criminal",
            "ADI: Ação Direta de Inconstitucionalidade",
            "ADPF: Arguição de Descumprimento de Preceito Fundamental",
            "AI: Agravo de Instrumento",
            "AO: Ação Originária",
            "AS: Arguição de Suspeição",
            "CJ: Conflito de Jurisdição",
            "EXT: Extradição",
            "HC: Habeas Corpus",
            "HD: Habeas Data",
            "IF: Intervenção Federal",
            "INQ: Inquérito",
            "MI: Mandato de Injunção",
            "MS: Mandato de Segurança",
            "PET: Petição",
            "PPE: Prisão Preventiva para Extradição",
            "PSV: Proposta de Súmula Vinculante",
            "QC: Queixa-Crime",
            "RC: Recurso Crime",
            "RCR: Recurso Ordinário Criminal",
            "RE: Recurso Extraordinário",
            "SE: Sentença Estrangeira",
            "SL: Suspensão de Liminar",
            "SS: Suspensão de Segurança",
            "STA: Suspensão de Tutela Antecipada",
            "STP: Suspensão de Tutela Provisória"
          ]
       
      
        const downloadPdf = (body) => {
          configurarLoading(true);
          configurarErroDownload('');
          const axiosConfig = {
            responseType: 'arraybuffer',
            headers: {
              Accept: 'application/json'
            }
          }
          axios.post(baseUrl, body, axiosConfig).then(response => {
            configurarLoading(false);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'stf.pdf');
            document.body.appendChild(link);
            link.click();
          }).catch((err) => {
            configurarLoading(false);
            configurarErroDownload(err.message);
          })
        }
      
        // onClick={() => downloadPdf(`${baseUrl}`, body, configurarErroDownload)} 
        const formik = useFormik({
          initialValues: {
              numero: "",
              idAcao: ""
          },
          onSubmit: values => {
            // console.log(values);
            downloadPdf(values);
            formik.resetForm();
          },
          validationSchema: formSchema
        });
      
        const onNumeroChange = e => {
          formik.setFieldValue('numero', e.target.value);
          configurarNumero(e.target.value);
        }
      
        const onAcaoChange = e =>{
          formik.setFieldValue('acao', e.target.value);
        }
      
        const onOptionChange = e => {
          let valor = `${e.target.value} ${numeroInput}`
          formik.setFieldValue('idAcao', valor);
        }
        return (
          <div className='w-[100%] font-mont'>
          {mostrarModal ? null : (
            <form onSubmit={formik.handleSubmit} className="flex flex-col pt-10 pl-40 pr-40 pb-10">
            <p className='text-myblue font-semibold'>Procure a ação no STF e preencha os valores a seguir. A seguir, você poderá fazer o download do PDF.</p>
            <p className='text-myblue'>Número - Os números dos processos variam de 1 até 1.300.497</p>
            <input 
                  value={formik.values.numero}
                  onChange={onNumeroChange}
                  onBlur={formik.handleBlur("numero")}
                  type="text" 
                  className="relative border-4 p-3 rounded-lg placeholder:p-4" 
                  placeholder='Coloque aqui o número da ação buscada'
              />
              <br />

                <>
                <p className='text-myblue'>Id da Ação</p>
                <p>
                <select id="idAcao" onChange={onOptionChange} className="pb-2 pt-2 pr-10" disabled={formik.values.numero === ""}>
                  <option disabled selected>Escolha um tipo de processo</option>
                  <option>AC</option>
                  <option>ACO</option>
                  <option>ACr</option>
                  <option>ADI</option>
                  <option>ADPF</option>
                  <option>AI</option>
                  <option>AO</option>
                  <option>AS</option>
                  <option>CJ</option>
                  <option>Ext</option>
                  <option>HC</option>
                  <option>IF</option>
                  <option>Inq</option>
                  <option>MI</option>
                  <option>MS</option>
                  <option>Pet</option>
                  <option>PPE</option>
                  <option>PSV</option>
                  <option>QC</option>
                  <option>RC</option>
                  <option>RCR</option>
                  <option>RE</option>
                  <option>SE</option>
                  <option>SL</option>
                  <option>SS</option>
                  <option>STA</option>
                  <option>STP</option>
                </select>
                <br />
                <br />
                </p>
                </>
     
             
          <button type="submit" className='flex flex-col justify-center items-center mt-5'>
                    <ImDownload2 size={50} color={"#315199"}/>
                    <p className='ml-3 criar-nova font-bakbak text-myblue'>{loading? 'Fazendo o download....' : 'Download dos dados sobre esta ação em PDF'}</p>
            </button>
            {erroDownload!==''&&(
              <div className="bg-white text-red-500">{erroDownload}</div>
            )}
        </form>
          )}
          <div className="flex md:flex-col justify-center items-center">
            {mostrarModal ? null : (
            <>
            <u>
            <p>Clique no botão abaixo se você não entendeu as siglas do campo "Id da Ação". O Id da ação se refere ao tipo de processo no STF.</p>
            </u>
              <div className="flex gap-5">
              <button type="button" className="border border-blue-100 bg-blue-600 text-white active:bg-black
                hover:bg-black flex justify-center items-center gap-2 font-bold px-6 h-12 rounded-md 
                shadow hover:shadow-lg outline-none focus:outline-none"
                onClick={() => configurarModal(true)}
                >Mostrar legendas</button> 
          </div>
          </>
            )}
  
            {
                mostrarModal ? (
                    <>
                    <ul className="mt-10 flex justify-center items flex-col w-72 rounded-lg shadow-xl auto p-2">
                    {legendasArray.map(e => (
                            <li className='text-xs text-myblue'>{e}</li>
                        ))}
                    </ul>
                    <button className="my-5 w-auto px-8 h-10 bg-blue-600 text-white 
                    rounded-md shadow hover:shadow-lg font-semibold"
                    onClick={()=>configurarModal(false)}
                    >Fechar</button>
                    </>
                ) : null
            }
        </div>
          {/* <LegendasModal /> */}
          <ul>
      
          </ul>
      
          
          </div>
    )
}